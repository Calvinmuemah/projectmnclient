import { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Tab,
  Nav,
} from 'react-bootstrap'
import { useAuth } from '../../Contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'

const Profile = () => {
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Preference state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setAvatar(user.avatar)
    }
  }, [user])

  const handleProfileUpdate = (e) => {
    e.preventDefault()

    if (!name || !email) {
      setError('Name and email are required')
      return
    }

    try {
      setError('')
      setSuccess('')
      setIsLoading(true)

      const success = updateProfile({
        name,
        email,
        avatar,
      })

      if (success) {
        setSuccess('Profile updated successfully')
      }
    } catch (err) {
      setError('Failed to update profile')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault()

    if (!currentPassword) {
      setError('Current password is required')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }

    if (currentPassword !== user.password) {
      setError('Current password is incorrect')
      return
    }

    try {
      setError('')
      setSuccess('')
      setIsLoading(true)

      const success = updateProfile({
        password: newPassword,
      })

      if (success) {
        setSuccess('Password updated successfully')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (err) {
      setError('Failed to update password')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatar(imageUrl)
    }
  }

  const handleSavePreferences = (e) => {
    e.preventDefault()
    try {
      setError('')
      setSuccess('')
      setIsLoading(true)

      // Simulate preference saving
      console.log('Preferences Saved:', {
        emailNotifications,
        darkMode,
        language,
      })

      setSuccess('Preferences saved successfully')
    } catch (err) {
      setError('Failed to save preferences')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="profile-page page-container">
      <Container>
        <h2 className="fw-bold mb-4">Profile Settings</h2>

        <Row>
          <Col md={3} className="mb-4 mb-md-0">
            <Card className="border-0 shadow-sm text-center p-4">
              <div className="mb-3">
                <img
                  src={avatar}
                  alt={name}
                  className="rounded-circle img-thumbnail"
                  width="120"
                  height="120"
                />
              </div>
              <h5 className="fw-bold mb-1">{name}</h5>
              <p className="text-muted mb-3">{email}</p>
              <div className="d-grid">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatarUpload"
                  onChange={handleAvatarChange}
                />
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() =>
                    document.getElementById('avatarUpload').click()
                  }
                >
                  Change Avatar
                </Button>
              </div>
            </Card>
          </Col>

          <Col md={9}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <Tab.Container defaultActiveKey="profile">
                  <Nav variant="tabs" className="mb-4">
                    <Nav.Item>
                      <Nav.Link eventKey="profile">
                        Profile Information
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="password">Password</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="preferences">Preferences</Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    <Tab.Pane eventKey="profile">
                      {error && (
                        <Alert variant="danger" className="mb-4">
                          {error}
                        </Alert>
                      )}
                      {success && (
                        <Alert variant="success" className="mb-4">
                          {success}
                        </Alert>
                      )}

                      <Form onSubmit={handleProfileUpdate}>
                        <Form.Group className="mb-4" controlId="name">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="email">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="avatar">
                          <Form.Label>Avatar URL</Form.Label>
                          <Form.Control
                            type="text"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            placeholder="Enter avatar URL"
                          />
                          <Form.Text className="text-muted">
                            Enter a URL or use the Change Avatar button to
                            upload
                          </Form.Text>
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </div>
                      </Form>
                    </Tab.Pane>

                    <Tab.Pane eventKey="password">
                      {error && (
                        <Alert variant="danger" className="mb-4">
                          {error}
                        </Alert>
                      )}
                      {success && (
                        <Alert variant="success" className="mb-4">
                          {success}
                        </Alert>
                      )}

                      <Form onSubmit={handlePasswordUpdate}>
                        <Form.Group className="mb-4" controlId="currentPassword">
                          <Form.Label>Current Password</Form.Label>
                          <Form.Control
                            type="password"
                            value={currentPassword}
                            onChange={(e) =>
                              setCurrentPassword(e.target.value)
                            }
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="newPassword">
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                          <Form.Text className="text-muted">
                            Password must be at least 6 characters long
                          </Form.Text>
                        </Form.Group>

                        <Form.Group
                          className="mb-4"
                          controlId="confirmPassword"
                        >
                          <Form.Label>Confirm New Password</Form.Label>
                          <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                              setConfirmPassword(e.target.value)
                            }
                            required
                          />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Updating...' : 'Update Password'}
                          </Button>
                        </div>
                      </Form>
                    </Tab.Pane>

                    <Tab.Pane eventKey="preferences">
                      <h5 className="mb-3">Application Preferences</h5>
                      <Form onSubmit={handleSavePreferences}>
                        <Form.Group className="mb-3" controlId="emailNotifications">
                          <Form.Check
                            type="switch"
                            label="Email Notifications"
                            checked={emailNotifications}
                            onChange={(e) =>
                              setEmailNotifications(e.target.checked)
                            }
                          />
                          <Form.Text className="text-muted">
                            Receive email updates about your projects
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="darkMode">
                          <Form.Check
                            type="switch"
                            label="Dark Mode"
                            checked={darkMode}
                            onChange={(e) => setDarkMode(e.target.checked)}
                          />
                          <Form.Text className="text-muted">
                            Use dark theme for the application
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="language">
                          <Form.Label>Language</Form.Label>
                          <Form.Select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                          </Form.Select>
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Saving...' : 'Save Preferences'}
                          </Button>
                        </div>
                      </Form>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile
