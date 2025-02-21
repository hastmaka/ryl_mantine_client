import {Menu, Button} from '@mantine/core';
import PropTypes from "prop-types";

export default function SectionBtn({setFields, data}) {
    return (
        <Menu shadow="md" width={200} withArrow>
            <Menu.Target>
                <Button bg='var(--color-2)' size='sm'>Add Section</Button>
            </Menu.Target>

            <Menu.Dropdown>
                {data.map((item, index) => (
                    <Menu.Item
                        key={index}
                        onClick={() => setFields(item, index)}
                    >{item.label}</Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
}

SectionBtn.propTypes = {
    setFields: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
}