import React from 'react'
import moment from 'moment'
import { CFooter, CLink } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <CLink>
          © {moment().format('YYYY')} Buy Smart
        </CLink>
      </div>
      {/*<div className="ml-auto">
        <span className="mr-1">Right text</span>
      </div>*/}
    </CFooter>
  )
}

export default React.memo(TheFooter)
