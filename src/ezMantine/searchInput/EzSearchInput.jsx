import PropTypes from "prop-types";
import {IconSearch} from "@tabler/icons-react";
import {TextInput} from "@mantine/core";
import {useRef} from "react";
import {useClickOutside} from "@mantine/hooks";
import {useEnterKeySubmit} from "@/util/hook/index.js";

export default function EzSearchInput({state, ...rest}) {
    const inputRef = useRef(null);
    useClickOutside(() => inputRef.current.placeholder = 'Search...', null, [inputRef]);

    const handleSearch = (e, ref) => {
        const value = e.key === 'Enter' ? ref.current.value : inputRef.current.value;
        const tempRef = e.key === 'Enter' ? ref : inputRef
        //empty input
        if(!value) {
            tempRef.current.placeholder = 'Enter some value first'
        } else {
            if(!(/^[a-zA-Z0-9]+$/.test(value))) {
                tempRef.current.value = ''
                return tempRef.current.placeholder = 'Only letters and numbers allow'
            }
            if(value.trim().length <= 3) {
                tempRef.current.value = ''
                return tempRef.current.placeholder = 'Min 3 characters to start a search'
            }
            state.handleSearch(value).then()
        }
    }

    const handleInputChange = (e) => {
        state.handleSearchInput(e.target.value)
        if(!e.target.value) {
            inputRef.current.placeholder = 'Search...'
            state.handleSearch().then()
        }
    }

    useEnterKeySubmit(inputRef, handleSearch);

    return (
        <TextInput
            ref={inputRef}
            className='input'
            size='md'
            radius='4px'
            // leftSectionPointerEvents="none"
            leftSection={<IconSearch width='18px' onClick={handleSearch}/>}
            placeholder='Search ...'
            onChange={handleInputChange}
            {...rest}
        />
    )
}

EzSearchInput.propTypes = {
    state: PropTypes.object.isRequired,
}
