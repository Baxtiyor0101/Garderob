module.exports = {
  locales: ["uzCryl", "uzLatin", "ru"],
  output: "src/locales/$LOCALE/translation.json",
  defaultNamespace: "translation",
  useKeysAsDefaultValue: true,
  defaultValueLanguage: "uzCryl", // <--- This is the missing part
  keySeparator: false,
  namespaceSeparator: false,
  interpolation: {
    prefix: "{{",
    suffix: "}}",
  },
  func: {
    list: ["t"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};
