import * as tt from 'typescript-definition-tester'

describe('ambient declaration tests', () => {
  it('should compile examples successfully against index.d.ts', (done) => {
    tt.compileDirectory(
      __dirname + '/typescript',
      filename => filename.match(/\.tsx?$/),
      {

        jsx: 'react',
        noImplicitAny: true,
        strictNullChecks: true
      },
      () => done()
    )
  })
})
