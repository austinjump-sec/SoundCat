import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Pure deep black/dark gray theme
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
    backgroundColor: '#1a1a1a',
  },
  logo: {
    width: 44,
    height: 44,
    marginRight: 14,
  },
  headerTitle: {
    color: '#39FF14', // Vibrant neon green matching the accent highlights
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    color: '#aaaaaa',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  importBox: {
    width: '100%',
    height: 180,
    borderWidth: 2,
    borderColor: '#39FF14',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
    padding: 20,
  },
  iconPlaceholder: {
    fontSize: 40,
    marginBottom: 12,
  },
  importText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  subText: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
  },
  fileDetailsCard: {
    marginTop: 30,
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
    borderLeftWidth: 4,
    borderLeftColor: '#39FF14',
  },
  fileLabel: {
    color: '#666666',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  fileName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
  fileSize: {
    color: '#888888',
    fontSize: 13,
    marginTop: 2,
  },
} );
export default styles