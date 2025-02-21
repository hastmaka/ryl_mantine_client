import PropTypes from "prop-types";
import {Stack, Text} from "@mantine/core";

export default function GenerateCase({data, color}) {
    const renderText = ({data, component = 'p', ...rest}) => data.map((item, index) =>
        <Text
            key={index}
            component={component}
            pl='1rem'
            ta='justify'
            c={color}
            {...rest}
        >{item}</Text>
    )

    const renderList = (list) => list.map((item, index) => {
        return (
            <Stack key={index}>
                <Text c={color}>{`${index + 1} - ${item.listTitle}`}</Text>
                <ul style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    {renderText({data: item.text, component:'li', ml: {base: '1rem', md: '2rem'}})}
                </ul>
            </Stack>
        )
    })

    return data.map((item, index) => {
        if (item.title && item.text) {
            return (
                <Stack key={index}>
                    <Text c={color}>{item.title}</Text>
                    {renderText({data: item.text})}
                </Stack>
            )
        }

        if (item.title && item.list) {
            return (
                <Stack key={index}>
                    <Text c={color}>{item.title}</Text>
                    {renderList(item.list)}
                </Stack>
            )
        }

        if (item.title) {
            return (
                <Stack key={index}>
                    <Text c={color}>{item.title}</Text>
                </Stack>
            )
        }

        if (item.text) {
            return renderText({data: item.text})
        }
    })
}

GenerateCase.propTypes = {
    data: PropTypes.array.isRequired
}
