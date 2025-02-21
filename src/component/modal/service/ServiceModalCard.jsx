import PropTypes from "prop-types";
import {
    Card,
    Combobox,
    Flex,
    InputBase,
    Text,
    useCombobox,
    Input,
    ScrollArea,
    Stack,
    CloseButton
} from "@mantine/core";
import classes from './ServiceModal.module.scss';
import {serviceModalSignal} from "../../../signal/serviceModalSignal.js";
import {generalSignal} from "../../../signal/generalSignal.js";
import {useEffect, useState} from "react";

export default function ServiceModalCard({item}) {
    const {screen} = generalSignal
    const {
        removeService,
        checkedService,
        handleServicePackage,
        handleServiceByPagesModulesHours
    } = serviceModalSignal
    //debugger
    const combobox = useCombobox({onDropdownClose: () => combobox.resetSelectedOption()});

    const [text, setText] = useState([])
    const pack = checkedService?.[item.name]?.pack || 'base'

    useEffect(() => {
        const temp = item.selectData.find(s => s.value === pack)?.description || item.text
        setText(temp)
    }, [pack])

    const handleSubmitOption = (val) => {
        if(['seo', 'ads', 'e-commerce', 'social-media-management', 'branding'].includes(item.name)) {
            const service = item.selectData.find(s => s.value === val)
            handleServicePackage({
                serviceName: item.name,
                price: service.price,
                pack: service.value,
                label: service.label
            })
        } else {
            handleServiceByPagesModulesHours({
                serviceName: item.name,
                price: item.price,
                label: val
            })
        }
    }

    return (
        <Card shadow="sm" p="2rem" radius="sm" withBorder flex={1}>
            <Card.Section p='0 0 2rem 0'>
                <Flex
                    direction='row'
                    justify='space-between'
                    align='flex-start'
                >
                    <Stack gap={0}>
                        <Text className={classes.label}>{item.title}</Text>
                        <Text className={classes.description}>{item.sub}</Text>
                    </Stack>
                    <Flex
                        direction={{base: 'column', xs: 'row-reverse'}}
                        align={{base: 'flex-start', xs: 'center'}}
                        gap='.5rem'
                    >
                        <Combobox
                            offset={4}
                            store={combobox}
                            w={item.width || 150}
                            shadow='md'
                            withinPortal={true}
                            onOptionSubmit={(val) => {
                                handleSubmitOption(val)
                                combobox.closeDropdown();
                            }}
                            classNames={{
                                groupLabel: classes.groupLabel,
                                option: classes.option,
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    pointer
                                    rightSection={
                                        checkedService?.[item.name] ? (
                                            <CloseButton
                                                size="sm"
                                                onMouseDown={(event) => event.preventDefault()}
                                                onClick={() => removeService(item.name)}
                                                aria-label="Clear value"
                                            />
                                        ) : (
                                            <Combobox.Chevron />
                                        )
                                    }
                                    onClick={() => combobox.toggleDropdown()}
                                    rightSectionPointerEvents={checkedService?.[item.name] ? 'all' : 'none'}
                                    className={classes['input']}
                                    style={{'--btn-border-color': !checkedService[item.name]
                                            ? 'var(--mantine-color-gray-3)'
                                            : 'var(--mantine-color-teal-6)'
                                    }}
                                >
                                    {checkedService?.[item.name]?.label || <Input.Placeholder>{item.placeholder}</Input.Placeholder>}
                                </InputBase>
                            </Combobox.Target>

                            <Combobox.Dropdown
                                className={classes.dropdown}
                                style={{
                                    '--dropdown-width': screen < 786
                                        ? `${item.dropDownWidth || '95%'}`
                                        : `${item.dropDownWidth || '500px'}`
                                }}
                            >
                                <ScrollArea.Autosize type="scroll" mah={400}>
                                    <Combobox.Options>
                                        {item.selectData.map((item, index) => {
                                            const description = item?.description
                                            if(typeof item === 'string') {
                                                return (
                                                    <Combobox.Options key={index}>
                                                        <Combobox.Option value={item}>
                                                            {item}
                                                        </Combobox.Option>
                                                    </Combobox.Options>
                                                )
                                            } else {
                                                return (
                                                    <Combobox.Group
                                                        key={index}
                                                        label={item.label || item}
                                                        onClick={() => {
                                                            handleSubmitOption(item.value)
                                                            combobox.closeDropdown();
                                                        }}
                                                        style={{cursor: 'pointer'}}
                                                    >
                                                        <Combobox.Option
                                                            value={item.value}
                                                            style={{display: 'flex', flexDirection: 'column', gap: '.5rem'}}
                                                        >
                                                            {description?.length > 0
                                                                ? description.map((item, index) =>
                                                                    <Text key={index}>{item}</Text>
                                                                ) : null}
                                                        </Combobox.Option>
                                                    </Combobox.Group>
                                                )
                                            }
                                        })}
                                    </Combobox.Options>
                                </ScrollArea.Autosize>
                            </Combobox.Dropdown>
                        </Combobox>

                        {item.sub && item.dropDownLabel
                            && <Text c='gray.7' size='xs'>{item.dropDownLabel}</Text>
                        }
                    </Flex>

                </Flex>
            </Card.Section>

            <ul>
                {text.map((item, index) =>
                    <li key={index} style={{listStyleType: 'circle'}}><Text c='dimmed'>{item}</Text></li>
                )}
            </ul>
        </Card>
    )
}

ServiceModalCard.propTypes = {
    item: PropTypes.object.isRequired
}