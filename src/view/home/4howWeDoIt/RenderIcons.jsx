import PropTypes from "prop-types";
import classes from '../Home.module.scss'
import {Flex, Image} from "@mantine/core";

export default function RenderIcons (data) {
    return (
        <Flex
            direction='row'
            justify='center'
            gap={{base: '2rem', md: '4rem'}}
            pt={{base: '2rem', md: '3rem'}}
            className={classes.container}
        >
            {data.map((item, index) =>
                <div key={index}>
                    <Image
                        className={classes.img}
                        src={`tech/${item}`}
                        alt={item.split('.')[0]}
                    />
                </div>
            )}
        </Flex>
    )
}

RenderIcons.propTypes = {
    data: PropTypes.array.isRequired
}
