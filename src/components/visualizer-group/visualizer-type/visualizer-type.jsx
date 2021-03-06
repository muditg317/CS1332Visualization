import React, { useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import { Helmet } from 'react-helmet';
import './visualizer-type.scss';

import { SiteMap, Utils } from 'utils';
import VisualizerTitle from './visualizer-title';
import BigOType from 'components/big-o-type';

export const VisualizerType = (props) => {
    let typeMatch = useRouteMatch({
        path: `/${props.group}/${props.type}`
    });
    let fullVisualizerClassMatch = useRouteMatch({
        path: `/${props.group}/${props.type}/:visualizerClass`
    });
    useEffect(() => {
        document.querySelector(".app-content").style["overflow-y"] = fullVisualizerClassMatch ? "" : "scroll";
        return () => {
            document.querySelector(".app-content").style["overflow-y"] = "";
        };
    }, [fullVisualizerClassMatch]);
    let type = SiteMap.filter(group => group.link === props.group)[0].types.filter(type => type.link === props.type)[0];
    let foundClass = fullVisualizerClassMatch && type.classes.map(visualizer => visualizer.link).includes(fullVisualizerClassMatch.params.visualizerClass);
    let visualizerClass = foundClass ? type.classes.filter(visualizer => visualizer.link === fullVisualizerClassMatch.params.visualizerClass)[0] : null;
    let VisualizerComponent = visualizerClass && visualizerClass.component;
    return (
            foundClass
                ? <VisualizerComponent visualizerClass={visualizerClass}/>
                : <div className="visualizer-type">
                    {typeMatch &&
                        <Helmet>
                            <title>{type.title_text} – CS-Vis</title>
                        </Helmet>
                    }
                    <h4 className={`visualizer-type-title${typeMatch ? "" : " clickable-type-title"}`} onClick={typeMatch ? null : () => {window.location.hash = `#/${props.group}/${props.type}`;}}>
                        {Utils.spannifyText(type.title_text,"CAPITALS")}
                    </h4>
                    <div className="visualizer-title-container">
                        {type.classes.map( (visualizer) => {
                            return visualizer.component && (
                                    <VisualizerTitle key={visualizer.link} group={props.group} type={props.type} title={visualizer.title_text} link={visualizer.link} />
                                );
                        })}
                    </div>
                    {typeMatch && <BigOType group={props.group} type={props.type} />}
                </div>
        );
}
