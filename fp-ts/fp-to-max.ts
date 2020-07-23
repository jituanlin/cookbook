#!/usr/bin/env ts-node

import * as simplegit from "simple-git/promise";
import { Gitlab as GitlabClientFactory } from "gitlab";
import * as fp from "fp-ts";
import * as rx from "rxjs";
import * as rxOp from "rxjs/operators";

const gitClient = simplegit();
const gitlabClient = new GitlabClientFactory({
    token: "personaltoken"
});

type WorkingBranch = string;
type TargetBranch = string;
type ProjectId = number;
type MrId = number;

interface AppConfig {
    workingBranch: WorkingBranch;
    targetBranch: TargetBranch;
    projectId: ProjectId;
}

type SimpleGitClient = Pick<simplegit.SimpleGit, "rebase" | "push">;
type SimpleGitlabClient = 42;

// gitlabClient.MergeRequests.create()

interface Program<F extends fp.hkt.URIS> extends fp.monad.Monad1<F> {
    finish: <A>(a: A) => fp.hkt.Kind<F, A>;
}

interface Git<F extends fp.hkt.URIS> {
    rebase: fp.readerT.ReaderT1<F, WorkingBranch, void>;
    push: fp.readerT.ReaderT1<F, WorkingBranch, void>;
}

interface Gitlab<F extends fp.hkt.URIS> {
    createMr: fp.readerT.ReaderT1<F, AppConfig, MrId>;
    mergeMr: (mrId: MrId) => fp.readerT.ReaderT1<F, AppConfig, void>;
}

interface Main<F extends fp.hkt.URIS> extends Program<F>, Git<F>, Gitlab<F> {}

const programDemo: Program<fp.io.URI> = {
    ...fp.io.io,
    finish: fp.io.io.of
};

const gitDemo: Git<fp.io.URI> = {
    rebase: (branch: WorkingBranch) => fp.console.log(`git rebase ${branch}`),
    push: (branch: WorkingBranch) => fp.console.log(`git push ${branch}`)
};

const gitlabDemo: Gitlab<fp.io.URI> = {
    createMr: (appConfig: AppConfig) =>
        fp.pipeable.pipe(
            fp.console.log(
                `gitlab createMr with option ${JSON.stringify(appConfig)}`
            ),
            fp.io.map(() => 42)
        ),
    mergeMr: (mrId: MrId) => (appConfig: AppConfig) =>
        fp.console.log(
            `gitlab mergeMr with option ${JSON.stringify(appConfig)} and mrId ${mrId}`
        )
};

const main = <F extends fp.hkt.URIS>(
    F: Main<F>
): fp.reader.Reader<AppConfig, fp.hkt.Kind<F, void>> => {
    const readerM = fp.readerT.getReaderM(F);
    const afterPush = fp.pipeable.pipe(
        readerM.chain(F.rebase, () => F.push),
        fp.reader.local((appConfig: AppConfig) => appConfig.workingBranch)
    );
    const mrId = readerM.chain(afterPush, () => F.createMr);
    const result = readerM.chain(mrId, id => F.mergeMr(id));
    return result;
};

const mainDemo = main({ ...programDemo, ...gitDemo, ...gitlabDemo });

mainDemo({
    workingBranch: "feature/aaa",
    targetBranch: "master",
    projectId: 42
})();
