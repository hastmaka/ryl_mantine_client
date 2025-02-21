import PropTypes from "prop-types";
import {Card, Checkbox, Flex, Text} from "@mantine/core";
import classes from "./ServiceModal.module.scss";
import {serviceModalSignal} from "../../../signal/serviceModalSignal.js";

const ITEM = [
    {
        label: 'Branding',
        description: '$299 / $499 / $699',
        name: 'branding'
    },
    {
        label: 'Content Creation',
        description: '$40/Hr',
        name: 'content-creation'
    },
]

export default function ComplementaryServices() {
    const {checkedService, handleCheckbox} = serviceModalSignal
    return (
        <Card shadow="sm" p="1rem" radius="sm" withBorder flex={1}>
            <Text c='var(--mantine-color-dimmed)'>Complementary Services</Text>
            <Text size='xs' c='var(--mantine-color-dimmed-1)'>We need to talk about these</Text>
            <Flex direction='row' pt='1rem' gap='1rem' style={{flexWrap: 'wrap'}}>
                {ITEM.map(({label, description, name}, index) => (
                    <Checkbox
                        key={index}
                        label={label}
                        description={description}
                        name={name}
                        color='teal'
                        classNames={{
                            label: classes.label,
                            description: classes.description
                        }}
                        checked={checkedService?.[name] || false}
                        onChange={() => {
                            handleCheckbox(name)
                        }}
                    />
                ))}
            </Flex>
        </Card>
    )
}

ComplementaryServices.propTypes = {}
