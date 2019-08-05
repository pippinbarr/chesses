## Menu

- ~~Connect games to menu items properly~~
- ~~Fancy up the menu~~
- ~~Fix the bug where returning from the menu doesn't work anymore~~
- ~~__TRIED THIS AND I THINK ADDED INFORMATION IS JUST A DISTRACTION__ Add interim step where clicking a game opens a description which then lets you play the game OR have the information text appear below the game title once play begins (might be nicer)~~

## General

- ~~__FUCK IT__ Consider availability of PGN, but probably don't bother with it (who would care, how would it help?)~~
- ~~How to indicate end-game situations? Some kind of overlay?~~
- ~~Make unmovable pieces shake rather than highlight~~
- ~~Investigate castling (make illegal in games where it can't work)~~

- Reduce delay for no move message as it's annoyingly slow now (or allow play while it displays)
- Add a highlight (border?) to show whose turn it is (and don't highlight during no input, shoudl help usability a lot)

## MAD

- ~~What happens when you capture with the king? I guess it gets removed and you lose immediately? Makes sense. Special case though.~~
- ~~Handle standard checkmate and stalemate~~

## GRAVITY

- ~~Fix the unrotation~~
- ~~Fix the gross animation (animate each piece one by one?)~~
- ~~Handle standard checkmate and stalemate~~

- Definite concerns about sometimes random behaviours (wondering if they're triggered by click during animation?)

## SLOTS

- ~~Issues around trying to play a piece that can't move once it has changed (presumably you should just sacrifice your turn in that instance, maybe shake the piece and then swap turn?)~~
- ~~Animate piece randomization right? Like a slot machine? Or even just flicker the piece a few times actually, that would be fine.~~
- ~~Issues around playing a piece that then cannot protect the king in a necessary moment (making check without an available king move very powerful since you can't guarantee that a piece can protect him or capture the attacker) - but you have to wait until AFTER the piece is generated to know whether checkmate can be averted! Heh.~~
- ~~Handle standard checkmate and stalemate~~
- ~~Handle issue of "deselecting" a piece~~
- ~~Handle issue of castling with a non-rook!~~

## EVERYONE

- ~~What happens if a pawn is generated on the top rank (convert to a queen I suppose)~~
- ~~Consider generating with the probabilities of chess?~~
- ~~Checkmate etc.~~

## MOMENTUM

- ~~Should the king slide? I mean... yes (but note that it could slide into checkmate)~~
- ~~Handle standard checkmate and stalemate~~
- ~~Make castling do what it should (both pieces should slide in that case!)~~

- Definitely saw some kind of bug with a pawn resurrecting after a move, unsure how to recreate right now (maybe loading invalid fen? Don't think so though... setting a weird position? Hmm.)

## CLONES

- ~~Checkmate etc.~~

## QUANTUM

- ~~Checkmate etc.~~
- ~~Need to check at squareClicked that the piece can make at least one legal move before proceeding - maybe I already do that? I do, but I should highlight the quantum set even in that special case (e.g. I should highlight all moves not just legal, providing there's at least one legal move - this may apply in other situations in terms of showing available moves on squareClicked - e.g. gravity? Oh wait I see I can do it by overriding getMoves instead I'll do that)~~

- Saw a bug with a random-ass piece appearing on the board in the checkmate test case

## EVERYONE

- ~~__IT'S JUST CHESS WITH A SHIT TON OF PIECES__ Checkmate etc.~~

---

## ~~Mirror~~

- ~~You guessed it: weird cases around check and checkmate and king captures~~
- ~~Handle standard checkmate and stalemate~~

## ~~Graves~~

- ~~Just the piece lying on its side to indicate it's dead, but it stays there~~

## ~~C team??? Double agent?~~

- ~~A version where captures are 'attacks' that turn the other piece grey so that it can then be controlled by either side, pretty complex idea though (to communicate, not to understand)~~

## ~~Swaps~~

- ~~Eliminate moves that would place you in checkmate through swapping?~~
- ~~(Allow moves that wouldn't actually put you in check through swapping? i.e. need to think about how swaps change the definition of a legal move? For instance it seems like capturing a checking piece is a legal move, but it can easily just leave you still in check)~~
- ~~Handle standard checkmate and stalemate~~

## ~~Pawns~~

- ~~Handle standard checkmate and stalemate~~
