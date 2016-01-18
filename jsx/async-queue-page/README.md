TODO
swap ticket idea for promises
bind client to specify scope


===============================================================================

You have a bunch of functions that may eventually call someFunction.

You want the bunch of functions to be able to reserve a spot in a queue for someFunction.


1. identify the function that should go through a queue (queueFunction)
2. identify functions that should auto-reserve spots in the queue (autoReserveFunctions)
3. convert any calls to autoReserveFunctions to then-ables
4. issue reservation
5. before then-able is resolved, calls to queueFunction will be queued
6. when then-able is resolved, remove reservation
