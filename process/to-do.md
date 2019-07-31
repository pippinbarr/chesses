## General

- Handle checkmate/stalemate/etc. in terms of some display and chance to restart
- Consider availability of PGN, but probably don't bother with it (who would care, how would it help?)

## Menu

- Connect games to menu items properly

## MAD

- What happens when you capture with the king? I guess it gets removed and you lose immediately? Makes sense. Special case though.

## Pawns

## Swaps

- Eliminate moves that would place you in checkmate through swapping
- (Allow moves that wouldn't actually put you in check through swapping? i.e. need to think about how swaps change the definition of a legal move? For instance it seems like capturing a checking piece is a legal move, but it can easily just leave you still in check)

## Graves

- Just the piece lying on its side to indicate it's dead, but it stays there

## C team??? Double agent?

- A version where captures are 'attacks' that turn the other piece grey so that it can then be controlled by either side, pretty complex idea though (to communicate, not to understand)

## Gravity

- Fix the unrotation
- Fix the gross animation (animate each piece one by one?)
- Think about the implications for checkmate etc.