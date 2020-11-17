go(A, B, _, S):-
    A > B, nl, write(S), nl, !.
go(A,B, C, S):-
    A =< B, 
    M is (A mod C),
    M = 0,
    write(A), write(" "),
    SUMNEW is (S + A),
    ANEW is (A + 1),
    go(ANEW, B, C, SUMNEW).
go(A,B, C, S):-
    A =< B, 
    (A mod C) >0,
    ANEW is (A + 1),
    go(ANEW, B, C, S).

input(A,B,C) :- read(A), read(B), read(C).
ex3:- input(A, B, C), go(A,B,C,0).