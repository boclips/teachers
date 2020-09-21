import * as React from 'react'
import {mount} from 'cypress-react-unit-test'
import PageLayout from 'src/components/layout/PageLayout'

it('works', () => {
  mount(<PageLayout>HELLO</PageLayout>, {cssFile: 'dist/main/css'})
})