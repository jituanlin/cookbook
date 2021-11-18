module CategoryTheoryForProgrammersChallenges.Challenge14
    ( 
    ) where

import Test.QuickCheck

class Category' cat where
    id' ::  cat a a
    compose :: cat b c -> cat a b -> cat a c

instance Category' (->) where
    id' = id
    compose = (.)

composeIdProp :: (Eq b) => a -> (a -> b) -> Bool 
composeIdProp a f = compose id' f  a == f a

instance Show (a -> b) where
    show _ = "a -> b" 
    

f = quickCheck (composeIdProp:: Int -> (Int -> Int)-> Bool)