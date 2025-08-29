
import React, { useEffect, useState } from 'react';
import {  View,  Text,  StyleSheet,  ScrollView,  SafeAreaView,  Dimensions,  Image,  TextInput,  TouchableOpacity,  Platform,  ActivityIndicator,  Modal,KeyboardAvoidingView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchSinglePost,  selectSinglePost,  selectBlogsLoading,} from '../redux/slices/BlogSlice';
import FastImage from 'react-native-fast-image';
import RenderHtml from 'react-native-render-html';
import colors from '../constants/colors'; 
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AuthorProfile from '../assets/images/AuthorProfile.png';
import BlueMsg from '../assets/images/bluemsg.svg';
import FooterTabs from '../components/FooterTabs';
import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
import BackIcon from '../assets/images/BackIcon.svg';
import { submitEnquiryForm, clearFormSubmission } from '../redux/slices/formSubmissionSlice';
const { width } = Dimensions.get('window');
const TopComments = ({ route, navigation }) => {
  const { postId } = route.params;
  const dispatch = useDispatch();
  const singlePost = useSelector(selectSinglePost);
  const loading = useSelector(selectBlogsLoading);
  const [comment, setComment] = useState(''); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); 
  const [saveInfo, setSaveInfo] = useState(false); 
  const [formErrors, setFormErrors] = useState({}); 
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const { loading: formLoading, response: formResponse, error: formError } = useSelector(state => state.formSubmission);
 const [isConnected, setIsConnected] = useState(true);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);
  useEffect(() => {
    if (postId) {
      dispatch(fetchSinglePost(postId));
    }
  }, [dispatch, postId]);
 useEffect(() => {
    let timer;
    if (formResponse) {
      setModalTitle('Success!');
      setModalMessage('Your comment has been successfully posted!');
      setModalVisible(true);
      setComment('');
      setName('');
      setEmail('');
      setWebsite('');
      setSaveInfo(false);
      setFormErrors({});
      timer = setTimeout(() => {
        setModalVisible(false);
        dispatch(clearFormSubmission()); 
      }, 3000); 
    } else if (formError) {
      setModalTitle('Error!');
      setModalMessage(formError || 'Something went wrong. Please try again.');
      setModalVisible(true);
      timer = setTimeout(() => {
        setModalVisible(false);
        dispatch(clearFormSubmission());
      }, 3000); 
    }
    return () => clearTimeout(timer); 
  }, [formResponse, formError, dispatch]);
  const handleInputChange = (field, value) => {
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [field]: undefined, 
    }));
    switch (field) {
      case 'comment':
        setComment(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'website':
        setWebsite(value);
        break;
      default:
        break;
    }
  };
  const handleSubmitComment = () => {
    const newErrors = {};
    if (!comment.trim()) { newErrors.comment = 'Comment cannot be empty.';
    }
    if (!name.trim()) { newErrors.name = 'Name is required.';}
    if (!email.trim()) {newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) { 
      newErrors.email = 'Invalid email format.';
    }
    if (!saveInfo) {
      newErrors.saveInfo = 'Please tick this box to proceed.';
    }
    setFormErrors(newErrors); 
    if (Object.keys(newErrors).length > 0) {
      return; 
    }
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const payload = {
      "page_type": "blog_comment", 
      "firstname": firstName,
      "lastname": lastName,
      "email": email,
      "message": comment,
       "phone": "N/A", 
    };
    dispatch(submitEnquiryForm(payload));
  };
  if (loading || !singlePost) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <SkeletonPlaceholder>
            <View style={{ width: width, height: 300 }} />
            <View style={{ padding: 20 }}>
              <View style={{ width: '90%', height: 30, borderRadius: 4, marginBottom: 10 }} />
              <View style={{ width: '60%', height: 20, borderRadius: 4, marginBottom: 20 }} />
              <View style={{ width: '100%', height: 100, borderRadius: 4, marginBottom: 10 }} />
              <View style={{ width: '90%', height: 30, borderRadius: 4, marginBottom: 10 }} />
              <View style={{ width: '60%', height: 20, borderRadius: 4, marginBottom: 20 }} />
              <View style={{ width: '100%', height: 100, borderRadius: 4, marginBottom: 10 }} />
              <View style={{ width: '100%', height: 100, borderRadius: 4 }} />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
  <View style={styles.safeArea}>
      {!isConnected ? (
       <View style={styles.noInterntView}>
       <NoInternetMessage />
       </View>
    ) : (
    <>
   <KeyboardAvoidingView
     style={{ flex: 1 }}
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
     keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}>
     <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sliderContainer}>
      <TouchableOpacity
       onPress={() => navigation.goBack()}
       style={styles.backbutton}>
       <BackIcon style={{ width: 20, height: 20 }} />
       </TouchableOpacity>
  <FastImage
    source={{ uri: singlePost.banner }}
    style={styles.fullWidthImage}
  />
</View>
     <View style={styles.mainContentArea}>
      <View style={styles.titleDateSection}>
      <View style={styles.topTextView}>
       <Image style={styles.locationIcon} source={require('../assets/images/LocationIcon.png')} />
       <Text style={styles.sectionTitle}> {singlePost.title}</Text>
        </View>
        <Text style={styles.dateStyle}>{singlePost.publish_date} | Latest News</Text>
     </View>
  <RenderHtml
   contentWidth={width - 40}
   source={{ html: singlePost.description }}
   tagsStyles={{
   h2: { color: colors.gold, fontWeight: 'bold', fontSize: 20, marginVertical: 10 },
   h3: { color: colors.darkGray, fontWeight: 'bold', fontSize: 18, marginVertical: 8 },
   p: { color: colors.gray, fontSize: 14, lineHeight: 22 }, 
   a: { color: colors.primary, textDecorationLine: 'underline' },
  }}
          />
          <View style={styles.aboutAuthorContainer}>
            <View style={styles.aboutAuthorHeader}>
              <FastImage source={AuthorProfile} style={styles.authorImage} />
              <Text style={styles.aboutAuthorTitle}>About Author</Text>
            </View>
            <Text style={styles.authorBio}>
              <Text style={styles.authorName}>{singlePost.author || 'Virikson Holidays'}</Text> a veteran travel writer and advisor, is highly known for her quest to explore the spectacular locales of the globe.
            </Text>
          </View>
          <View style={styles.leaveReplyContainer}>
            <View style={[styles.aboutAuthorHeader,{backgroundColor:'#0069CA14'}]}>
              <BlueMsg style={styles.leaveReplyIcon} />
              <Text style={styles.leaveReplyTitle}>Leave a Reply</Text>
            </View>
            <Text style={styles.requiredFieldsText}>
              Your email address will not be published. Required fields are marked <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <Text style={styles.lableStyle}>Comment</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Write your thoughts here..."
              multiline
              numberOfLines={4}
              value={comment}
            onChangeText={(text) => handleInputChange('comment', text)}
              placeholderTextColor="#888"
            />
               {formErrors.comment && <Text style={styles.errorText}>{formErrors.comment}</Text>}
            <Text style={styles.lableStyle}>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your Full Name Here"
              value={name}
               onChangeText={(text) => handleInputChange('name', text)}
              placeholderTextColor="#888"
            />
             {formErrors.name && <Text style={styles.errorText}>{formErrors.name}</Text>}
            <Text style={styles.lableStyle}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your Email Address Here"
              keyboardType="email-address"
              value={email}
               onChangeText={(text) => handleInputChange('email', text)}
              placeholderTextColor="#888"
            />
             {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}
            <Text style={styles.lableStyle}>Website</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your Website Here"
              value={website}
              onChangeText={(text) => handleInputChange('website', text)}
              placeholderTextColor="#888"
            />

              <TouchableOpacity 
                  style={styles.checkboxContainer} 
                  onPress={() => {
                    setSaveInfo(!saveInfo);
                    setFormErrors(prevErrors => ({ ...prevErrors, saveInfo: undefined })); 
                  }}
                >
                  <View style={[styles.checkbox, formErrors.saveInfo && styles.inputError]}>
                    {saveInfo && <Text style={styles.checkboxCheck}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxText}>
                    Save my name, email, and website in this browser for the next time I comment.
                  </Text>
                </TouchableOpacity>
                {formErrors.saveInfo && <Text style={styles.errorText}>{formErrors.saveInfo}</Text>}

                <TouchableOpacity 
                  style={[styles.postCommentButton, formLoading && styles.disabledButton]} 
                  onPress={handleSubmitComment}
                  disabled={formLoading} 
                >
                  {formLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.postCommentText}>Post Comment</Text>
                  )}
                </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <FooterTabs/>
        <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.modalTitle, { color: formError ? 'red' : 'green' }]}>{modalTitle}</Text>
                <Text style={styles.modalText}>{modalMessage}</Text>
              
              </View>
            </View>
          </Modal>
       </>
       )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  container:{ 
    paddingBottom: 20,},
  fullWidthImage: {
    width: width,
    height: 300,
    objectFit: "fill"
  },
  backbutton:{
     position: 'absolute',
      top: 50,
      left: 20, 
      zIndex: 10,
      backgroundColor: '#ffffff',
      borderRadius: 8,
  },
  noInterntView:{flex: 1, 
    justifyContent: 'center',
     alignItems: 'center'},
  errorText:{
    color:'red',
    marginBottom: 4,
    paddingHorizontal:3,
    fontSize:12,
    fontWeight:'500'
  },
  topTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginBottom: 20 
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  viriksonHoliday: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 8,
  },
  mainContentArea: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 0,
    marginTop: -40, 
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  titleDateSection: {
    marginBottom: 15,
  },
  mainTitleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  dateStyle: {
    fontSize: 10,
    color: '#888',
    marginTop: 40, 
    position: "absolute",
    right: 0
  },
  aboutAuthorContainer: {
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
    marginTop: 20,
  },
  aboutAuthorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#C28D3E14',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius:10
  },
  authorImage: {
    width: 11,
    height: 14,
    borderRadius: 15,
    marginRight: 10,
  },
  aboutAuthorTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#101010',
  },
  authorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  authorBio: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  leaveReplyContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 20,
  },
  leaveReplyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  leaveReplyIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  leaveReplyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  requiredFieldsText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
  },
  commentInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
  },
  textInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,

    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#C28D3E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxCheck: {
    color: '#C28D3E',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 13,
    color: '#555',
    flexShrink: 1,
  },
  postCommentButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width: '75%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop:20,
    marginBottom:60
  },
  postCommentText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
   centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  button: { 
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
 
  
  lableStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop:30
  },
});

export default TopComments;