var assert = chai.assert;

var callback = {

  localStore: function() {
    if(localStorage)
      return "true";
    else
      return "false";
  },

  test: function(text) {
    return test_main(text);
  }
};

var declaracion_variables='{  "type": "BLOCK",  "const_decls": [    {      "type": "CONST VAR",      "name": "m",      "value": 7    },    {      "type": "CONST VAR",      "name": "n",      "value": 85    }  ],  "var_decl": [    {      "type": "VAR",      "name": "x"    },    {      "type": "VAR",      "name": "y"    },    {      "type": "VAR",      "name": "z"    },    {      "type": "VAR",      "name": "q"    },    {      "type": "VAR",      "name": "r"    }  ],  "proc_decl": null,  "content": [    []  ]}';
var suma = '{  "type": "BLOCK",  "const_decls": null,  "var_decl": null,  "proc_decl": null,  "content": {    "type": "=",    "left": {      "type": "ID",      "value": "VARSUMA"    },    "right": {      "type": "+",      "left": {        "type": "NUM",        "value": 100      },      "right": {        "type": "NUM",        "value": 50      }    }  }}'; 
var resta = '{  "type": "BLOCK",  "const_decls": null,  "var_decl": null,  "proc_decl": null,  "content": {    "type": "=",    "left": {      "type": "ID",      "value": "VARRESTA"    },    "right": {      "type": "-",      "left": {        "type": "NUM",        "value": 100      },      "right": {        "type": "NUM",        "value": 50      }    }  }}'; 
var solution1='{  "type": "BLOCK",  "const_decls": null,  "var_decl": null,  "proc_decl": null,  "content": {    "type": "=",    "left": {      "type": "ID",      "value": "A"    },    "right": {      "type": "/",      "left": {        "type": "/",        "left": {          "type": "NUM",          "value": 8        },        "right": {          "type": "NUM",          "value": 4        }      },      "right": {        "type": "NUM",        "value": 2      }    }  }}';
var solution2='{  "type": "BLOCK",  "const_decls": null,  "var_decl": [    {      "type": "VAR",      "name": "f"    },    {      "type": "VAR",      "name": "g"    }  ],  "proc_decl": null,  "content": [    {      "type": "=",      "left": {        "type": "ID",        "value": "f"      },      "right": {        "type": "ID",        "value": "x"      }    },    {      "type": "=",      "left": {        "type": "ID",        "value": "g"      },      "right": {        "type": "ID",        "value": "y"      }    },    {      "type": "WHILE",      "cond": {        "type": "!=",        "left": {          "type": "ID",          "value": "f"        },        "right": {          "type": "ID",          "value": "g"        }      },      "st": [        {          "type": "IF",          "cond": {            "type": "<",            "left": {              "type": "ID",              "value": "f"            },            "right": {              "type": "ID",              "value": "g"            }          },          "st": {            "type": "=",            "left": {              "type": "ID",              "value": "g"            },            "right": {              "type": "-",              "left": {                "type": "ID",                "value": "g"              },              "right": {                "type": "ID",                "value": "f"              }            }          }        },        {          "type": "IF",          "cond": {            "type": "<",            "left": {              "type": "ID",              "value": "g"            },            "right": {              "type": "ID",              "value": "f"            }          },          "st": {            "type": "=",            "left": {              "type": "ID",              "value": "f"            },            "right": {              "type": "-",              "left": {                "type": "ID",                "value": "f"              },              "right": {                "type": "ID",                "value": "g"              }            }          }        }      ]    },    {      "type": "=",      "left": {        "type": "ID",        "value": "z"      },      "right": {        "type": "ID",        "value": "f"      }    },    []  ]}';
var solution3='{  "type": "BLOCK",  "const_decls": null,  "var_decl": null,  "proc_decl": null,  "content": [    {      "type": "=",      "left": {        "type": "ID",        "value": "r"      },      "right": {        "type": "ID",        "value": "x"      }    },    {      "type": "=",      "left": {        "type": "ID",        "value": "q"      },      "right": {        "type": "NUM",        "value": 0      }    },    {      "type": "=",      "left": {        "type": "ID",        "value": "w"      },      "right": {        "type": "ID",        "value": "y"      }    },    {      "type": "WHILE",      "cond": {        "type": "<=",        "left": {          "type": "ID",          "value": "w"        },        "right": {          "type": "ID",          "value": "r"        }      },      "st": {        "type": "=",        "left": {          "type": "ID",          "value": "w"        },        "right": {          "type": "*",          "left": {            "type": "NUM",            "value": 2          },          "right": {            "type": "ID",            "value": "w"          }        }      }    },    {      "type": "WHILE",      "cond": {        "type": ">",        "left": {          "type": "ID",          "value": "w"        },        "right": {          "type": "ID",          "value": "y"        }      },      "st": [        {          "type": "=",          "left": {            "type": "ID",            "value": "q"          },          "right": {            "type": "*",            "left": {              "type": "NUM",              "value": 2            },            "right": {              "type": "ID",              "value": "q"            }          }        },        {          "type": "=",          "left": {            "type": "ID",            "value": "w"          },          "right": {            "type": "/",            "left": {              "type": "ID",              "value": "w"            },            "right": {              "type": "NUM",              "value": 2            }          }        },        {          "type": "IF",          "cond": {            "type": "<=",            "left": {              "type": "ID",              "value": "w"            },            "right": {              "type": "ID",              "value": "r"            }          },          "st": [            {              "type": "=",              "left": {                "type": "ID",                "value": "r"              },              "right": {                "type": "-",                "left": {                  "type": "ID",                  "value": "r"                },                "right": {                  "type": "ID",                  "value": "w"                }              }            },            {              "type": "=",              "left": {                "type": "ID",                "value": "q"              },              "right": {                "type": "+",                "left": {                  "type": "ID",                  "value": "q"                },                "right": {                  "type": "NUM",                  "value": 1                }              }            }          ]        }      ]    }  ]}';
var solution4 ='SyntaxError: Expected "." or [ \t\n\r] but end of input found.';
suite('PL/0 Analyzer using PEG.js', function() {

    test('Declaracion de variables y un bloque ', function () {
      assert.deepEqual(callback.test('CONST  m =  7,  n = 85; VAR  x, y, z, q, r; BEGIN END.'),declaracion_variables);
      
    });
    
    test('Suma', function () {
      assert.deepEqual(callback.test('VARSUMA = 100 + 50 .'),suma);
      
    });
    
    test('Resta', function () {
      assert.deepEqual(callback.test('VARRESTA = 100 - 50 .'),resta);
      
    });
    
    //------------------------------****************--------------------------------
    test('Division asociativa a la izquierda ', function () {
      assert.deepEqual(callback.test("A = 8 / 4 / 2."),solution1);
      
    });

    test('Bloque con bucle while e itrucciones condicionales (if else) ', function () {
      assert.deepEqual(callback.test("VAR f, g; BEGIN  f = x;  g = y;  WHILE (f != g) DO BEGIN IF (f < g) THEN g = g - f; IF (g < f) THEN f = f - g END; z = f; END."),solution2);
    });
    
    test('Bloque completo con instrucciones while y operaciones algebraicas ', function () {
      assert.deepEqual(callback.test("BEGIN r = x; q = 0; w = y; WHILE (w <= r) DO w = 2 * w; WHILE (w > y) DO BEGIN q = 2 * q;  w = w / 2; IF (w <= r) THEN BEGIN      r = r - w;      q = q + 1    END  END END."),solution3); 
      
    });
    
     test('Bloque completo con instrucciones while y operaciones algebraicas (ERROR FALTA .)', function () {
      assert.deepEqual(callback.test("BEGIN r = x; q = 0; w = y; WHILE (w <= r) DO w = 2 * w; WHILE (w > y) DO BEGIN q = 2 * q;  w = w / 2; IF (w <= r) THEN BEGIN      r = r - w;      q = q + 1    END  END END"),solution4); 
      
    });

});
