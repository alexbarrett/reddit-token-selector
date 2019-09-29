Reddit Token Selector
=====================

This is a quick attempt at the coding challenge outlined in this Reddit post:
https://www.reddit.com/r/javascript/comments/75zyrm/this_onsite_coding_assignment_failed_20_frontend/

The spec can also be viewed in [content.txt](content.txt) contained in this repository.

Notes
-----

This code is very rough around the edges. My goal was to finish relatively
quickly so there is no testing, no comments, etc. Time take: 1 hour 15 minutes
(excluding writing this readme).


Implementation
--------------

The server parses the file `content.txt` and wraps each token with a `span` tag. If the token starts with a vowel, the span is given class name "baky", otherwise it's given class name "kola".

On the client-side, when a span element is clicked its index is added to (or removed from) the set of selected token indices and sent to the server via Socket.IO. The server then broadcasts this event to all other connected clients resulting in everyone having a mostly synchronized set of selections.
