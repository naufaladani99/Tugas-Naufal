import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div>
            <h2>Main Layout</h2>
            <ul>
                <Link to='/region'>
                    Region
                </Link>
                <Link to='/regionformik'>
                    Region Formik
                </Link>
                <Link to='/regionredux'>
                    Region Redux
                </Link>
            </ul>
            <main>
                {/* Page title & actions */}
                <Outlet />
            </main>
        </div>
    )
}
