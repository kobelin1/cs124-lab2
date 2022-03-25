import React from 'react'
import { Dropdown } from 'semantic-ui-react'

// This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

const DropdownExampleDropdown = () => (
    <Dropdown text='Sort By'>
        <Dropdown.Menu>
            <Dropdown.Item text='Creation Date' />
            <Dropdown.Item text='Priority' />
            <Dropdown.Item text='Name' />
        </Dropdown.Menu>
    </Dropdown>
)

export default DropdownExampleDropdown