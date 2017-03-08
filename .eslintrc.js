module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "globals": {
        "__dirname": true,
        "require": true,
        "module": true,
        "React": true,
        "ga": true,
        "adsbygoogle": true
    },
    "plugins": [
        "react",
        "html"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-uses-vars": 1,
        "react/jsx-uses-react": 1,
        "react/react-in-jsx-scope": 1,
        "react/jsx-no-undef": 1,
        "react/jsx-equals-spacing": [0, "always"],
        "react/prop-types": 0,
        "arrow-parens": [2, "as-needed"],
        "camelcase": 1,
        "no-console": 0,
        "no-unexpected-multiline": 0
    }
};
