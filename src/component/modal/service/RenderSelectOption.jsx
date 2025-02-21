import PropTypes from "prop-types";
import {Divider, Flex, Stack, Text} from "@mantine/core";
import {IconCheck} from "@tabler/icons-react";

const iconProps = {
    stroke: 2,
    color: 'green',
    opacity: 1,
    size: 18,
};

export default function RenderSelectOption({option, checked, item}) {
    return (
        <Stack>
            <Flex align='center' justify='space-between' >
                <Text >{option.label}</Text>
                {checked ? (
                    item?.icon ? (
                        <IconCheck style={{ marginInlineStart: 'auto' }} {...iconProps} />
                    ) : (
                        <Text c='teal.8'>Selected</Text>
                    )
                ) : null}
            </Flex>
            {option?.description?.length > 0 &&
                <ul
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                    }}
                >
                    {option?.description.map((item, index) =>
                        <li key={index}><Text c='dimmed'>{item}</Text></li>
                    )}
                </ul>
            }
            {option?.divider &&<Divider/>}
        </Stack>
    )
}

RenderSelectOption.propTypes = {
    option: PropTypes.object,
    checked: PropTypes.bool,
    item: PropTypes.object.isRequired
}
