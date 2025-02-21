import PropTypes from "prop-types";
import classes from '../UseCases.module.scss';
import {Anchor, Card, Image, Stack} from "@mantine/core";
import BookNowBtn from "../../../component/BookNowBtn.jsx";
import {generalSignal} from "../../../signal/generalSignal.js";

export default function UseCasesCard({item}) {
    const {openModal, setCase} = generalSignal
    return (
        <Card className={classes['card-wrapper']}>
            <Card.Section className={classes.section} p='1rem'>
                <Image src={item.imgPath} alt={item.alt} fit='fill'/>
                <BookNowBtn
                    className={classes.btn}
                    text='useCases.card.btn'
                    onClick={() => {
                        setCase(item.name)
                        openModal()
                    }}
                />
            </Card.Section>

            <Stack pt='1rem' className={classes['card-body']} align='center'>
                <Anchor
                    className={classes['card-title']}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    c='var(--mantine-color-gray-7)'
                >{item.title}</Anchor>
            </Stack>


        </Card>
    )
}

UseCasesCard.propTypes = {
    item: PropTypes.object.isRequired
}
