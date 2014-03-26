/*
 * Classic example grammar, which recognizes simple arithmetic expressions like
 * "2*(3+4)". The parser generated from this grammar then AST.
 */

{
  var tree = function(f, r) {
    if (r.length > 0) {
      var last = r.pop();
      var result = {
        type:  last[0],
        left: tree(f, r),
        right: last[1]
      };
    }
    else {
      var result = f;
    }
    return result;
  }
}

program = b:block END_SYMBOL { return b; }

block = const_decl? var_decl? proc_decl* statement 

const_decl = CONST ID ASSIGN NUMBER (COMMA ID ASSIGN NUMBER)* END_SENTENCE

var_decl = VAR ID (COMMA ID)* END_SENTENCE

/*
 * procedure nombre (parámetro1, parámetro2, ...);
 *   código
 *   ...
 */
proc_decl
  = PROCEDURE ID arglist? END_SENTENCE block END_SENTENCE

arglist
  = LEFTPAR ID (COMMA ID)* RIGHTPAR

statement
  = CALL ID arglist?
  / BEGIN statement (END_SENTENCE statement)* END
  / IF LEFTPAR c:condition RIGHTPAR THEN st:statement ELSE sf:statement {
    return {
      type: 'IFELSE',
      cond: c,
      st: st,
      sf: sf,
    };
  }
  / IF LEFTPAR c:condition RIGHTPAR THEN st:statement {
    return {
      type: 'IF',
      cond:  c,
      st: st
    };
  }
  / WHILE LEFTPAR c:condition RIGHTPAR DO st:statement {
    return {
      type: 'WHILE',
      cond: c,
      st: st
    };
  }
  / DO st:statement WHILE LEFTPAR c:condition RIGHTPAR {
    return {
      type: 'DOWHILE',
      cond: c,
      st: st
    };
  }
  / i:ID ASSIGN e:expression {
    return {
      type: '=',
      left: i,
      right: e
    };
  }
  / /* aceptamos sentencias vacías */

condition
  = ODD expression
  / expression COMPARISON_OP expression

expression = t:term r:(ADD term)* { return tree(t,r); }
term = f:factor r:(MUL factor)* { return tree(f,r); }

factor 
  = NUMBER
  / ID
  / LEFTPAR exp:expression RIGHTPAR { return exp; }

_ = $[ \t\n\r]*

ASSIGN   = _ op:'=' _  { return op; }
ADD      = _ op:[+-] _ { return op; }
MUL      = _ op:[*/] _ { return op; }
ID       = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _ { 
              return {
                type: 'ID',
                value: id
              };
            }
NUMBER   = _ digits:$[0-9]+ _ { 
              return {
                type: 'NUM',
                value: parseInt(digits, 10)
              };
            }
COMPARISON_OP = _ op:([<>=!]'=') _
              / _ op:[<>] _ {
                  return {
                    type: 'COMPARISON',
                    value: op
                  };
                }

LEFTPAR  = _"("_
RIGHTPAR = _")"_
END_SYMBOL = _'.'_
END_SENTENCE = _';'_
COMMA = _','_

VAR = _'VAR'_
CONST = _'CONST'_
IF       = _'IF'_
THEN     = _'THEN'_
ELSE     = _'ELSE'_
PROCEDURE = _'PROCEDURE'_
CALL = _'CALL'_
BEGIN = _'BEGIN'_
END = _'END'_
WHILE = _'WHILE'_
DO = _'DO'_
ODD = _'ODD'_
