## 2017-08-14 19:32

This is just to say that I have officially made a folder for _Chesss_ and plan to type up the variations that were in my notebook in here in a moment if there's time before dinner? Let's see!

### 4:33 of Chess

I guess this is either than after 4:33 the game abruptly ends, possibly without you being able to move. Alternatively you need to specifically not do anything (not move the mouse etc.) for 4:33 for the performance of the game to complete. Any movement causes you to lose.

### Realtime Slow Motion / SUPER HOT CHESS?

You can move whenever you want to but the pieces take a long time to get to where they're going so you have to remember where they're headed? Seems complicated. It's a bit like Flight Control? Big question aruond two players here. Any kind of AI may well be a nightmare unless I write some kind of basic three move look-ahead?

### Loving / Sex Chess

When you capture a piece it generates a new piece instead, halfway between the parents, or on a square next to one of the parents. It could be a grey piece, in which case those pieces would then become a third player in the game? What happens if a grey piece mates with a black or white piece? Ad infinitum? Just continues to add new kinds of pieces? Is there a reason why they should be segregated into different teams and fighting? Or either person can move the grey pieces...

### Merging Chess

As above but when you capture the two pieces become a single grey piece which either player can choose to move. Would have to consider what properties that piece would have - is it a hybrid with the movement possibilities of both? Would does it look like??

### Clone Wars

Moving a piece leaves a copy behind. (Note that this would make it impossible for all back rank pieces to move except knights)

### Big Chess

Chess on a board with more than 64 squares, possibly with things like fog of war. How do you choose the pieces? Maybe it's still 8 wide, but just super long? If you play into the fog of war you might get stuck on a piece that you couldn't see?

### Wall

There's a wall in the middle of the board that pieces can't move past. Conceivably have a door? A series of rooms? (Starts sounding like Chogue...)

### Art

Pieces leave a line behind them showing where they've been. Maybe it fades.

### Fog of War

Separately from Big Chess you could implement a fog of war based on what pieces can see. I guess a piece can see as far as it can move?

### 'Tank' Chess?

Movement is time based - you have to drive the piece along its path within the time limit...

### Everyone Gets to Play

You can only move a piece after you've moved all your other pieces - they have a cool-down. This would mean you'd have to move all your pieces in order. Could make the cooldown less severe, too.

### Music Chess

Board as tone grid, piece styles as instruments... different positions have different sounds...

### Foley Chess

Don't love this right now, but you record foley for how each piece sounds when it moves (and captures)

### Art Chess 2

Draw the pieces before you start playing. Some potential advantage to confusing your opponent in terms of which piece is which here, which is interesting... but at the risk of confusing yourself.

### Voice Recognition CHess

Pretends to listen to you making a move, then does something else randomly?

### Up Close and Personal

Pieces all start right in front of each other at the middle of the board...

### Gravity Chess

Could be sideways, but could also just be the regular orientation (that might even be better in terms of formal structure). The pieces fall vertically down. Presumably this is an advantage for black? Who would be able to queen more easily? (White can't queen at all...)

### Angry Chess Birds

Angry birds style movement? Launch pieces at each other. Higher points pieces weigh more.

### HP Chess

Pieces have HP so a capture is more of an attack.

### Text Chess

Text adventure version of chess?

### Exploding Chess

Moved piece starts a timer (in turns). Explodes at end of timer with some blast radius (bigger for better pieces?) timer is reset if you move it again. Can still capture normally too?

### GPS Chess

Board laid out in physical space - 100x100m squares? Selection works based on where you are, then tap, then walk to where you want the piece to go.

### Momentum chess

Any move slides in its direction until stopped by another piece or the edge

... that's 23.

---

# Return of the Chesses (Monday, 29 July 2019, 10:22AM)

Weirdly I hadn't realised I already started this project two years ago and started doing it again. It was only when I tried to make a new repo called 'chesss' and GitHub told me it already existed that I found out.

In the meantime I made the Chess Edition of the punishment game and ROGESS and so have a bunch more experience with chess.js and chessboard.js. As such I'll be making the variations in that and with those technologies in mind.

I'm also just shooting for simpler more formal variations rather than the wildness of the above. I'll go for 8 since then I can represent a menu on a chess board. Not 64 though.

As such here's my proposed list:

- GRAVITY: board rotated 90º, pieces fall down on each move.
- M.A.D. (Mutually assured destruction): every capture results in the removal of both pieces
- MUSIC: game as a tone matrix that keeps playing while you play, each colour an instrument perhaps, or even each piece, or something
- GRAVES: captures work as an "attack" that leaves the captured piece grey and dead but still in place blocking any moves to that square
- PAWNS: you have a king and then the entire rest of the board is pawns.
- COUNTDOWN: each piece has a set number of moves before it vanishes (based on its value, maybe 10x the value? 5?)
- ICE/SKATES/MOMENTUM: any move continues in the same direction until stopped by the edge of the board or another piece (how would this work with knights? Just diagonals...?)
- SWAPSIES: pieces swap position instead of capturing, swapping with the king is a win (or just checkmate really)
- SLOTS: when you choose the piece to move it runs through all possible pieces and then once chosen you can move it like that piece
- MIRROR: when you move a piece the piece on the mirrored square moves too...? Seems like that won't work.

So that's 10. Plus looking at the 2017 ideas... NOPE. None of them really appeal so I'll stick with the above list.

Next step, really, is "just" to try to build some.

Because I'll almost certainly have to alter chess.js and even chessboard.js, I'll probably need to use the non-minified versions and I'll probably need to find ways to pass flags in so that the modifications don't affect distinct games. Could get ugly? We'll see.

---

# "Good games" and Legal moves (Wednesday, 31 July 2019, 15:36PM)

Hi there. Thought I ought to at least try writing something here, though thus far the games don't feel thaaaat intense design-wise - perhaps not least of all because this isn't the most research-y project, more an impulse to make more variations on a core game and see what happens.

## "Good games"

I think there's something in here about finding out which games feel interesting and which don't. And further to that, the tension around which games seem like "good games" or at least playable, versus variations that seem clearly broken from the get go and not "worth playing". I think this is tied into the hyper abstract nature of chess - because there's nothing else to grab onto but the act of playing itself, the importance of fairness/balance etc. becomes magnified and it's not so interesting to play unbalanced or clearly flawed variations. Not being a particularly great chess player, it's also just hard for me to look at a variation and know whether it sucks, whether there's a dominant strategy etc. So I think there's something to that.

## Legal moves

The variations definitely mean you need to think through consequences particularly around end conditions like checkmate, and more generally around the idea of legal moves. In chess you can't move into check, which means that I need to think about which moves can be offered in particular situations - for instance in the swapping game, you can't capture a piece checking the king with the king (if it has symmetric movement) because you'd still be in check after that move, so you need to disallow that move. And that means you need to recalculate whether the king is in checkmate (no available moves from check).

---

# Detecting checkmate, detecting stalemate, other game endings, legal moves, requires more thought (Friday, 2 August 2019, 16:38PM)

The problem with implementing weird variations of chess while relying on an underlying chess engine is that the chess engine thinks you're playing regular chess. This means that its ability to detect things like checkmate and stalemate can be impaired in the context of the variation. There are some pretty weird cases you could imagine.

## Detecting checkmate

One big philosophical question: do I allow a player to "checkmate themselves" by performing a move that would allow their king to ultimately be captured? (Think of a move in gravity that drops an opposition piece in a capturing relation to the king.)

If I _don't_ want to allow that, I'll need to simulate every possible move (using the variation) before calculating the legality. That's clearly possible but damn if it doesn't sound like work. And does it really add to the game? For instance it doesn't allow players to discover the comic moment of checkmating themselves - instead they'll see certain moves that look legal as being disallowed which seems sad?

The alternative is "just" to always quickly reverse turn and check for check each time. If it's your turn and you have the opponent in check, you have won (it's effectively checkmate since they literally cannot move).

So perhaps that's the solution for all modes in terms of checkmate?

At the start of a turn:
- Flip the turn
- Check for check
- If true, the player whose turn it really is wins
- If false, flip the turn back and let them play normally

This will allow players to play into a checkmate, but honestly I think that's fine and importantly it's robust in the face of weird variations.

## Detecting stalemate

Stalemate occurs when one side cannot perform a legal move - this is always because the king would be in check no matter what move was played.

It feels like there a situations where this won't make sense?

- SLOTS is a problem since Stalemate would be decided on the value of the pieces on the board, but we then change the piece. But I guess we can check stalemate after the piece is chosen in that case.

This seems hard actually, much harder? Because stalemate is declared based on the standard rules, but it may be there are various rules that defeat stalemate?

## Other game endings

In MAD you could capture a piece with your king, destroying your king instantly and losing the game.

## Legal moves

It's definitely the case that there are extra legal moves available in some modes that won't be identified as such by the chess engine? e.g. in Gravity you could drop a piece in front of the king (using the gravity property) to protect it from check.

## Requires more thought.
