export class Repository {
  async find(id: number): Promise<{name: string}> {
    return {
      name: `name${id}`,
    };
  }
}
