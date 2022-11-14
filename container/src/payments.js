import React from 'react';
import ErrorBoundary from './ErrorBoundary';
const PaymentsApp = React.lazy(() => import('payments/App'));

const Payments = () => {
    return (
        <>
            <ErrorBoundary>
                <PaymentsApp source="web"/>
            </ErrorBoundary>
        </>
    )
}

export default Payments;