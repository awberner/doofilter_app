import React, {useState, useEffect} from "react";
import {SafeAreaView, StyleSheet} from 'react-native';
import Background from "../components/backgrounds/Background";
import AppBarEdit from "../components/appBars/AppBarEdit";
import TabBarEdit from "../components/edit/TabBarEdit";
import DoofilterView from "../components/edit/DoofilterView";
import ToolsView from "../components/edit/ToolsView";
import ExportView from "../components/edit/ExportView";

export default function EditImageScreen (props) {

    const [imageUploaded, setImageUploaded] = useState(null);
    const [activeSection, setActiveSection] = useState('doofilter');
    const [toolsModalVisible, setToolsModalVisible] = useState(false);

    useEffect(() => {
        if(props && props.route && props.route.params && props.route.params.image) {
            setImageUploaded(props.route.params.image);
        }
    }, [props]);

    const handleActiveSection = (section) => {

        section === 'tools' && activeSection === 'tools' ?
            setToolsModalVisible(!toolsModalVisible) :
            setToolsModalVisible(true);

        setActiveSection(section);

    }

    //console.log(props.route.params.image)

    return (
        <Background page={'black'}>

            <AppBarEdit goBack/>

            <SafeAreaView style={styles.safeArea}>

                <DoofilterView activeSection={activeSection} imageUploaded={imageUploaded} />

                <ToolsView activeSection={activeSection} imageUploaded={imageUploaded}
                           toolsModalVisible ={toolsModalVisible}
                           setToolsModalVisible ={setToolsModalVisible}/>

                <ExportView activeSection={activeSection} imageUploaded={imageUploaded} />

                <TabBarEdit activeSection={activeSection} handleActiveSection={handleActiveSection}/>

            </SafeAreaView>

        </Background>
    );

};




const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});
