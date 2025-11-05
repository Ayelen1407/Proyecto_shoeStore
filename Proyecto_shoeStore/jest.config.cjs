module.exports = {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },

  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // alias como en Vite
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // mock de estilos
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // mock de imágenes
  },

  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx', // excluye el entrypoint
  ],
};
