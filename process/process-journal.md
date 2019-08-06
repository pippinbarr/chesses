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

---

## Down with legal moves (Friday, 2 August 2019, 19:29PM)

So with a little checking in the source code for chess.js (weirdly not in the docs?) it turns out you can specify that the engine should return all moves from a position, not just legal moves. Most importantly, this means it will allow moves that put the king in check.

With that in the pocket it would be possible to detect a variations set of legal moves by running through all possible moves, running them through the variation's specific outcomes, and then eliminating the moves that result in check? This would admittedly return me to a situation where the game might 'inexplicably' not allow moves that seem like they should be possible? But more likely it'd just make a few moves possible that wouldn't be in other modes.

All this suggests that it's important to be able to simulate moves, check their check status, and then undo them - which the engine provides for fine. I don't see this being a massive problem really? But perhaps it will be. Anyway it seems like there's a way through. It also allows detecting checkmate because it would just be that you're in check with no legal (in the sense of the variation) moves available.

Basically it shouldn't be too horrific?

---

# Ongoing legalities, bad games (Saturday, 3 August 2019, 14:44PM)

## Ongoing legalities

I've made a start on working with the question of legal moves. Started out with Gravity since I think it's the most "simulation" oriented version. It wasn't too hard to add a simulating/silent mode to the key code that generates the board from a move. Realised I had to ask chess.js to give me illegal moves and then edit them myself because it's possible for an "illegal" move to save you from check. Overall it now seems to work pretty effectively and should allow

- Detecting checkmate and stalemate
- Disallowing moves that place you in check after gravity applies

Now that I know I can make it work I think I'm happier with the idea that the engine disallows moving into check. The one exception to this will be the MAD version where you capture with the king and therefore vanish I think - that's too funny to lose.

So I think this is progress.

## Bad games

I have noticed my feelings of dissatisfaction about a couple of the modes

- Pawns is fine but ultimately it just doesn't seem all that interesting? Maybe it's better to just fill the board with random pieces altogether, just guaranteeing that there are two kings in their original positions? Could start the game in checkmate, but that's fine? Maybe that's a more interesting experience. Pawns is visually pleasing but leads to an incredibly boring game. Call the new mode Random? Or something else? Unsure.

- Mirror just does not feel very satisfying at all to play. The symmetry of chess works against it because the vast majority of the time it's, well, mirrored. I'd hoped symmetry would break down faster and you'd end up with odd moves, but of course symmetry cannot break down particularly fast when the only asymmetry on the entire board is the king/queen positions. So all you get is that. And even that's better than the other mirroring where it's literally every piece moving the same. It does feel like there's something to this, but it just isn't working very well right now.

- Swaps worries me in that it may be too much like mirror? But probably not since it only applied on capture? I think it's proooobably okay, but maybe a teeny bit borderline.

So in the end I think Pawns can be saved with the above idea. Mirror I think may have to be scrapped and I'll need something extra. I could think about the dead pieces idea because I could maintain a list of square they're on and disallow moves that involve that square? But even that won't work because it'd be hard to disallow moves that pass through it?

Maybe it's just back to the drawing board for this one.

---

# More versions (Saturday, 3 August 2019, 19:31PM)

Well it's the evening and I've been casually slapping together a few new versions of chess after feels saddened by existing versions. Just today I've built

- Random (all squares occupied by a random piece)
- Clones (any moved piece is cloned rather than moved)
- Quantum (pieces perform every move)
- Fate (piece performs exactly one of its legal moves when selected)

Rattling off four new games definitely makes me feel a bit better about the shortcomings in the existing versions and I think I can replace some. Quantum is funny but I think is probably unplayable because white has an enormous advantage in being able to move its queen first to the point that it's basically unplayable? (Actually I'm noticing one issue is that it's being limited to playing legal moves only, whereas I'd like it to play every possible move (including the illegal moves?)) Might help.

Anyway now I think I'd pick the following at my 8

- Gravity
- Mad
- Momentum
- Random
- Slots
- Clones
- Fate
- Quantum if it can be saved? Swaps once I see a bit more how it feels?

e.g. dropping Mirror and Pawns for sure, and maybe Swaps.

---

# Check and checkmate handled, slidy castling is funny, almost done (Monday, 5 August 2019, 16:36PM)

Did a ton of small work on the game today. Essentially I went through making sure the game could detect and respond to checkmate and stalemate.

Which sounds simple, but of course a number of the games involve weird moves that could get you into or out of check and so I had to rewrite a bunch of stuff so that the code that checks which moves are possible from a position takes this into account. It was quite a lot of work and I also refactored bits of the code as I went to make life easier.

One good thing was clarifying the UI language for invalid versus failed moves. It's possible in slots to choose a valid piece but then have it change to something that cannot move, so now the idea is: if you choose a piece that cannot possibly move (taking into account that it could turn into any piece) it shakes. If you choose a piece and it turns out afterwards it cannot move, you get a message telling you that.

Also implemented nice castling for momentum so the rook slides away just like the king. It's pretty funny to look at.

Overall I'm quite happy with how this thing is turning out. The chesses themselves are weird and I think probably a bit fun to play with. And then the implementation feels relatively solid (other than weird hard-to-reproduce bugs which are the worst). Again the benefits of working with established libraries/engines to do a bunch of the heavy lifting that would otherwise have killed me.

I'd say this will be ready with a day or two more work, so I can schedule it perhaps for two weeks from now?

---

# "Done?" (Tuesday, 6 August 2019, 12:08PM)

Okay I think it's done. Spent a lot of time on horrible input bug stuff but I think it's all taken care of? Classic issues around asynchronous event handling blah blah blah. Mostly it amounted to: if you click real fast on lots of squares you'll confuse the shit out the system and it will bug out. So mostly the fix was carefully allowing/disallowing input at appropriate moments. Seems to work?

Also added queening to momentum chess because that makes sense. And renamed some of the modes to try to get closer to their essence (while remaining classy and wry).

So I suppose it's now the press kit and some retroactive attempts at research questions? Related work?

It really doesn't feel like this has been the most researchy of my games, especially compared to the kind of examinations of platforms and design tweaks that the punishment series has represented, but it's been really quite fun to make and does at least do something along the lines of thinking through how much games change with only small additions to their rules.
