/*
 * Gramática que reconoce PL/0, añadiendo soporte para asignar parámetros
 * a los procedimientos
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

block = cd:const_decls? vd:var_decl? pd:proc_decl* st:statement {
  return {
    type: 'BLOCK',
    const_decls: cd,
    var_decl: vd,
    proc_decl: pd.length > 0? pd : null,
    content: st
  };
}

const_decls = CONST cd:const_decl cds:(COMMA const_decl)* END_SENTENCE {
  res = [cd];
  for (var i in cds)
    res.push(cds[i][1]);
  return res;
}

const_decl = id:ID ASSIGN nb:NUMBER {
  return {
    type: 'CONST VAR',
    name: id.value,
    value: nb.value
  };
}

var_decl = VAR id:ID ids:(COMMA ID)* END_SENTENCE {
  res = [{
    type: 'VAR',
    name: id.value
  }];
  for (var i in ids) {
    res.push({
      type: 'VAR',
      name: ids[i][1].value
    });
  }
  return res;
}

/*
 * procedure nombre (parámetro1, parámetro2, ...);
 *   código
 *   ...
 */
proc_decl
  = PROCEDURE pid:ID al:arglist? END_SENTENCE b:block END_SENTENCE {
    return {
      type: 'PROCEDURE',
      name: pid.value,
      args: al,
      block: {
        const_decls: b.const_decls,
        var_decl: b.var_decl,
        proc_decl: b.proc_decl,
        content: b.content
      }
    };
  }

arglist
  = LEFTPAR id:ID ids:(COMMA ID)* RIGHTPAR {
    var res = [{
      type: 'ARG',
      value: id.value
    }];
    for (var i in ids) {
      res.push({
        type: 'ARG',
        value: ids[i][1].value
      });
    }
    return res;
  }

argexplist
  = LEFTPAR e:expression es:(COMMA expression)* RIGHTPAR {
    var res = [{
      type: 'ARG',
      content: e
    }];
    for (var i in es) {
      res.push({
        type: 'ARG',
        content: es[i][1]
      });
    }
    return res;
  }

statement
  = CALL id:ID al:argexplist? {
    return {
      type: 'PROC_CALL',
      name: id.value,
      arguments: al
    };
  }
  / BEGIN st:statement sts:(END_SENTENCE statement)* END {
    var res = [st];
    for (var i in sts)
      res.push(sts[i][1]);
    return res;
  }
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
  = ODD e:expression {
    return {
      type: 'ODD',
      exp: e
    };
  }
  / leftexp:expression c:COMPARISON_OP rightexp:expression {
    return {
      type: c,
      left: leftexp,
      right: rightexp
    };
  }

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

ID = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _ {
  return {
    type: 'ID',
    value: id
  };
}

NUMBER = _ digits:$[0-9]+ _ { 
  return {
    type: 'NUM',
    value: parseInt(digits, 10)
  };
}

COMPARISON_OP
  = _ op:$([<>=!]'=') _ { return op; }
  / _ op:[<>] _ { return op; }

LEFTPAR      = _"("_
RIGHTPAR     = _")"_
END_SYMBOL   = _'.'_
END_SENTENCE = _';'_
COMMA        = _','_

VAR          = _'VAR'_
CONST        = _'CONST'_
IF           = _'IF'_
THEN         = _'THEN'_
ELSE         = _'ELSE'_
PROCEDURE    = _'PROCEDURE'_
CALL         = _'CALL'_
BEGIN        = _'BEGIN'_
END          = _'END'_
WHILE        = _'WHILE'_
DO           = _'DO'_
ODD          = _'ODD'_
