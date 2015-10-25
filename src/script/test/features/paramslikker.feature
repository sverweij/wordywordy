Feature: Swallowing parameters from an URL
    As a user of paramslikker.js 
    I want to have parameters from an URL available in a plain object
    So that I can use them with ease

    Scenario Outline: emtpy-ish and invalid url parameters evaluate to the empty object
        Given The paramslikker module is available 
        When Presented with <input> 
        Then The returned value should be the empty object

        Examples:
        | input                 | desc                              |
        | an empty URL          | no string passed                  |
        | ?                     | only the parameter starter passed |
        | ?debug                | only a name, no value             |
        | ?debug&donottrack     | only names, no values             |
        | ?msc=msc{a,b,c; a->b; c->b; b >> * [label="answer"]} | inproperly escaped |

    Scenario Outline: Valid URLs get converted into objects
        Given The paramslikker module is available 
        When Presented with <input> 
        Then The returned value should be <parsed_output>

        Examples:
        | input                 | parsed_output     |
        | ?debug=               | {"debug": ""}     |
        | ?debug=yep            | {"debug": "yep"}     |
        | ?debug=true           | {"debug": "true"} |
        | ?debug=1&donottrack=1 | {"debug": "1", "donottrack": "1"} |
        | ?withspaces=with spaces | {"withspaces": "with spaces"} |
        | ?msc=msc%7Ba%2Cb%2Cc%3B%20a-%3Eb%3B%20c-%3Eb%3B%20b%20%3E%3E%20*%20%5Blabel%3D%22answer%22%5D%7D | {"msc" : "msc{a,b,c; a->b; c->b; b >> * [label=\"answer\"]}" } | 
