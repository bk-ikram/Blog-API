import { NavLink } from 'react-router-dom';

export default function NavElement({path,children}){
    return(
        <NavLink 
            to={path}
        >
            {children}
        </NavLink>
    )
}