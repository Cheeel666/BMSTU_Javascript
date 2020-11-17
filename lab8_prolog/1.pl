% f.1.10

fibGo(F1, F2, A, B):-
    F1 < A, 
    F3 is (F1 + F2),
    fibGo(F2, F3, A, B).

fibGo(F1, F2, A, B):-
    F1 >= A, F1 =< B, 
    write(F1), write(" "),
    F3 is (F1 + F2),
    fibGo(F2, F3, A, B).

write_number(CURRENT, A) :- 
    SQUARE is CURRENT * CURRENT,
    SQUARE >= A,
    !, write(SQUARE),
    write(" "); true.

print_nums(A, B, CURRENT) :- 
    CURRENT_NEW is CURRENT + 1, 
    TMP is CURRENT_NEW * CURRENT_NEW,
    B >= TMP,
    write_number(CURRENT_NEW, A),
    print_nums(A, B, CURRENT_NEW).

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

input(A,B) :- read(A), read(B).
input(A,B,C) :- read(A), read(B), read(C).
ex1:- input(A,B), fibGo(0, 1, A, B).
ex2:- input(A,B), print_nums(A, B, 0).
ex3:- input(A, B, C), go(A,B,C,0).