import PropTypes from "prop-types";
import classes from './Section5.module.scss'
import {Stack} from "@mantine/core";
import {motion} from "framer-motion";
import {NavLink} from "react-router-dom";

const MotionLi = motion.create(NavLink)

export default function ServicePrev({ services, marginTop }) {
    return (
        <Stack
            component="ul"
            className={classes.services}
            mt={marginTop}
            h='fit-content'
        >
            {services.map(({to, title}, index) => (
                <li
                    key={index}
                    style={{
                        listStyle: 'none',
                        display: 'inline-block',
                    }}
                >
                    <MotionLi
                        key={index}
                        to={`/service/${to}`}
                    >
                        {title}
                    </MotionLi>
                </li>
            ))}
        </Stack>
    )
}

ServicePrev.propTypes = {
    services: PropTypes.array.isRequired,
    marginTop: PropTypes.string.isRequired
}
