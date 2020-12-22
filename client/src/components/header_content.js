import React from 'react'
import { Link } from 'react-router-dom';

const HeaderContent = (props) => {
  
    return (
        <React.Fragment>
            <div className="card-header">
                <ul className="nav nav-pills w-100">
                    <li className="nav-pill active">
                        <a className="nav-link">{props.left_title}</a>
                    </li>
                    <li className="nav-pill active">
                    </li>
                    {
                        props.right_title !== undefined
                            ?
                            <li className="nav-pill ml-auto">
                                <Link className="nav-link active" to="/add">{props.right_title}</Link>
                            </li>
                            :
                            ''
                    }
                </ul>
            </div>
        </React.Fragment>
    )
}

export default HeaderContent;