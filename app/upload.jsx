import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Alert,
    Image,
    Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { theme } from "../theme";
import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";





const screens = [
    {
        id: 1,
        title: "Welcome",
        content: "dummy text ",
    },
    {
        id: 2,
        title: "Welcome",
        content: "dummy text ",
    },
    {
        id: 3,
        title: "Welcome",
        content: "dummy text ",
    },


];

const Upload = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSection, setSelectedSection] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState({});

    useEffect(() => {
        loadSavedFiles();
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        try {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (cameraPermission.status !== 'granted' || libraryPermission.status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Camera and media library access is required to take and choose photos.',
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            console.error('Error requesting permissions:', error);
        }
    };

    const loadSavedFiles = async () => {
        try {
            const savedFiles = await AsyncStorage.getItem('uploadedFiles');
            if (savedFiles !== null) {
                setUploadedFiles(JSON.parse(savedFiles));
            }
        } catch (error) {
            console.error('Error loading files:', error);
            Alert.alert('Error', 'Failed to load saved files');
        }
    };

    const saveFileData = async (section, fileData) => {
        try {
            const updatedFiles = {
                ...uploadedFiles,
                [section]: {
                    ...fileData,
                    timestamp: new Date().toISOString(),
                }
            };

            await AsyncStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
            setUploadedFiles(updatedFiles);
            Alert.alert('Success', 'File uploaded successfully');
        } catch (error) {
            console.error('Error saving file:', error);
            Alert.alert('Error', 'Failed to save file');
        }
    };

    const handleTakePhoto = async () => {
        try {
            const { status } = await ImagePicker.getCameraPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Please grant camera permission to take photos.',
                    [
                        {
                            text: 'Open Settings',
                            onPress: () => Linking.openSettings(),
                        },
                        { text: 'Cancel' }
                    ]
                );
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
                allowsEditing: true,
                base64: true,
            });


            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0];
                await saveFileData(selectedSection, {
                    uri: asset.uri,
                    type: 'image',
                    base64: asset.base64,
                    width: asset.width,
                    height: asset.height,
                });
                setModalVisible(false);
            }
        } catch (error) {
            console.error('Camera error:', error);
            Alert.alert('Error', 'Failed to take photo: ' + error.message);
        }
    };

    const handleChooseFromGallery = async () => {
        try {
            const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Please grant media library access to choose photos.',
                    [
                        {
                            text: 'Open Settings',
                            onPress: () => Linking.openSettings(),
                        },
                        { text: 'Cancel' }
                    ]
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
                allowsEditing: true,
                base64: true,
            });

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0];
                await saveFileData(selectedSection, {
                    uri: asset.uri,
                    type: 'image',
                    base64: asset.base64,
                    width: asset.width,
                    height: asset.height,
                });
                setModalVisible(false);
            }
        } catch (error) {
            console.error('Gallery error:', error);
            Alert.alert('Error', 'Failed to pick image from gallery: ' + error.message);
        }
    };

    const handleUploadFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/jpeg', 'image/png'],
                copyToCacheDirectory: true,
            });

            if (result.type === 'success') {
                await saveFileData(selectedSection, {
                    uri: result.uri,
                    type: result.mimeType,
                    name: result.name,
                    size: result.size,
                });
                setModalVisible(false);
            }
        } catch (error) {
            console.error('Document picker error:', error);
            Alert.alert('Error', 'Failed to upload file: ' + error.message);
        }
    };

    const handleDeleteFile = async (section) => {
        try {
            const updatedFiles = { ...uploadedFiles };
            delete updatedFiles[section];
            await AsyncStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
            setUploadedFiles(updatedFiles);
            Alert.alert('Success', 'File deleted successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to delete file');
        }
    };

    const sections = [
        {
            title: "Applicant ID document",
            description: "Upload a certified version of your ID document.",
        },
        {
            title: "Directors ID documents",
            description: "Upload all directors ID documents.",
        },
        {
            title: "Company registration documents",
            description: "COR 14.3, COR 15.3 or CM1, CM2 or CM9 from CIPC.",
        },
    ];


    const { width } = useWindowDimensions();
    const [currentScreen, setCurrentScreen] = useState(0);
    const router = useRouter();
    const progress = ((currentScreen + 4) / screens.length) * 100;

    const handleNext = () => {
        if (currentScreen < screens.length - 1) {
            setCurrentScreen(currentScreen + 4);
        } else {
            router.push("/upload");
        }
    };

    const renderUploadedFile = (section) => {
        const file = uploadedFiles[section.title];
        if (!file) return null;







        return (
            <>






                <View style={styles.uploadedFileContainer}>
                    <View style={styles.filePreview}>
                        {file.type.includes('image') ? (
                            <Image source={{ uri: file.uri }} style={styles.uploadedImage} />
                        ) : (
                            <Ionicons name="document" size={24} color="#00A676" />
                        )}
                        <View style={styles.fileInfo}>
                            <Text style={styles.uploadedFileName}>
                                Uploaded: {new Date(file.timestamp).toLocaleDateString()}
                            </Text>
                            <TouchableOpacity
                                onPress={() => handleDeleteFile(section.title)}
                                style={styles.deleteButton}
                            >
                                <Ionicons name="trash-outline" size={20} color="#ff4444" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </>


        );
    };

    return (



        <>

            <View style={styles.container2}>
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${progress}%` }]} />
                </View>
            </View>


            <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.headerTitle}>Upload supporting documents</Text>
                    <Text style={styles.headerSubtitle}>
                        Submit the required documents by uploading files or capturing photos
                        to complete your application and verify your information.
                    </Text>

                    {sections.map((section, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.cardTitle}>{section.title}</Text>
                            <Text style={styles.cardDescription}>{section.description}</Text>
                            {renderUploadedFile(section)}
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={() => {
                                    setSelectedSection(section.title);
                                    setModalVisible(true);
                                }}
                            >
                                <Ionicons
                                    name={uploadedFiles[section.title] ? "refresh" : "add"}
                                    size={20}
                                    color="#00A676"
                                />
                                <Text style={styles.uploadText}>
                                    {uploadedFiles[section.title] ? 'Replace file' : 'Tap here to upload'}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.supportText}>
                                Supported: JPG, PDF, PNG. Maximum file size: 10MB
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBottomContainer}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Upload {selectedSection}</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Ionicons name="close" size={30} color="#003E59" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.modalDescription}>
                                Choose an option to upload your file.
                            </Text>

                            <TouchableOpacity style={styles.modalButton} onPress={handleTakePhoto}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="camera" size={24} color="#00a676df" />
                                </View>
                                <Text style={styles.modalButtonText}>Take a Photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButton} onPress={handleChooseFromGallery}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="image" size={24} color="#00a676df" />
                                </View>
                                <Text style={styles.modalButtonText}>Choose from Gallery</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButton} onPress={handleUploadFile}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="cloud-upload" size={24} color="#00a676df" />
                                </View>
                                <Text style={styles.modalButtonText}>Upload File</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

        </>



    );
};

const styles = StyleSheet.create({



    container2: {

        backgroundColor: theme.colors.gray400

    },
    progressContainer: {
        height: 4,
        backgroundColor: theme.colors.gray600,
        width: "100%",
        marginTop: 7,
    },
    progressBar: {
        height: "100%",
        backgroundColor: theme.colors.green100,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },






    container: {
        padding: 20,
        backgroundColor: "#F5F5F5",

    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: theme.colors.heading,
        marginBottom: 10,
    },
    headerSubtitle: {
        fontSize: 16,
        color: "gray",
        marginBottom: 20,
    },
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#red",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#002B4C",
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: "gray",
        marginBottom: 15,
    },
    uploadButton: {
        backgroundColor: "#E8F7EF",
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
    },
    uploadText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#00A676",
        marginLeft: 8,
    },
    supportText: {
        fontSize: 12,
        color: "gray",
    },
    uploadedFileContainer: {
        marginBottom: 15,
    },
    filePreview: {
        backgroundColor: "#F8F9FA",
        borderRadius: 8,
        padding: 10,
    },
    uploadedImage: {
        width: 60,
        height: 60,
        borderRadius: 4,
        marginRight: 10,
    },
    fileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    uploadedFileName: {
        fontSize: 14,
        color: "#002B4C",
    },
    deleteButton: {
        padding: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalBottomContainer: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#002B4C",
    },
    modalDescription: {
        fontSize: 14,
        color: "gray",
        marginBottom: 20,
    },
    modalButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: "white",
        borderColor: "#d6d1ce",
        borderWidth: 1,
    },
    modalButtonText: {
        fontSize: 16,
        color: "#003E59",
        marginLeft: 15,
    },
    iconContainer: {
        backgroundColor: "#bff4d8",
        borderRadius: 8,
        padding: 8,
    },
});

export default Upload;