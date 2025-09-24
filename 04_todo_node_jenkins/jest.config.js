export default {
  testEnvironment: "node",
  transform: {},
  reporters: [
    "default", // keep default console output
    [
      "jest-junit",
      {
        outputDirectory: "./reports", // folder for reports
        outputName: "junit.xml", // filename
        ancestorSeparator: " › ",
        addFileAttribute: "true"
      }
    ]
  ]
};
