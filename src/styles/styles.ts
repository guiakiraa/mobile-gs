import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    // Take full width to accommodate the list properly
    width: '95%', // Increased width slightly
    flex: 1, // Allow container to take available space
    alignItems: 'center',
    // Removed justifyContent: 'center' to allow content to flow from top
  },
  form: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#00ff00',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
    marginBottom: 15, // Added some margin for spacing
  },
  button: {
    marginTop: 30,
    backgroundColor: '#00ff00',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28, // Slightly larger title
    fontWeight: 'bold',
    marginTop: 40, // Added margin top to push it down from the top edge
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Added text shadow for better readability
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  listContainer: {
    flexGrow: 1, // Allows content to grow and be scrollable
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 5, // Added horizontal padding for the list items
  },
  pontoCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.9)', // Slightly darker and more opaque background
    borderRadius: 10, // Slightly more rounded corners
    padding: 15,
    marginBottom: 12, // Increased margin between cards
    borderWidth: 1,
    borderColor: '#00ff00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#00ff00', // Added subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5, // Elevation for Android shadow
  },
  pontoInfo: {
    flex: 1,
    marginRight: 10, // Space between info and action buttons
  },
  pontoNome: {
    color: '#fff',
    fontSize: 19, // Slightly larger font size
    fontWeight: 'bold',
    marginBottom: 4, // Reduced margin for tighter info
  },
  pontoEndereco: {
    color: '#a0a0a0', // Slightly darker grey for less contrast
    fontSize: 15, // Slightly larger font size
    marginBottom: 4,
  },
  pontoCapacidade: {
    color: '#00ff00',
    fontSize: 15,
    fontWeight: '600', // Slightly bolder
  },
  pontoActions: {
    flexDirection: 'row',
    gap: 5, // Reduced gap between action buttons
  },
  actionButton: {
    padding: 10, // Increased padding for easier tapping
    backgroundColor: 'rgba(0, 255, 0, 0.1)', // Subtle green background
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Added a semi-transparent background
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', // Added a semi-transparent background
  },
  errorText: {
    color: '#ff6666', // A bit softer red
    fontSize: 18, // Larger error text
    textAlign: 'center',
    marginBottom: 25, // More margin
  },
  retryButton: {
    backgroundColor: '#00cc00', // A slightly different green
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#000',
    fontWeight: '700', // Bolder text
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#ff0000',
  },
});

export default styles;