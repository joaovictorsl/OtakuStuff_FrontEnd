import React from "react"
import {
  MainDiv, Center, FormDiv, ResponsiveRow
} from "../styles"
import { Row, Col, Form } from "react-bootstrap"
import AuthService from "../../../services/auth"
import { useRouter } from "next/dist/client/router"
import { toast } from "react-toastify"
import { setLoggedUser } from "../../../store/modules/auth/reducer"
import { useDispatch } from "react-redux"
import { IUser } from "../../../dtos/User"
import { StyledButton } from "../../Shared/StyledButton"
import { Theme } from "../../../styles/theme"
import { UserImage } from "./UserImage"
import { StyledInput } from "../../Shared/StyledInput"

export const SignUpForm: React.FC = () => {

  const router = useRouter()
  const dispatch = useDispatch()

  const fileField = React.useRef(null)
  const [imageToShow, setImageToShow] = React.useState('https://cdn.myanimelist.net/images/anime/13/17405.jpg');
  const [image, setImage] = React.useState(null);
  const [nickname, setNickname] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);

  const formData: FormData = new FormData();

  const handleSubmit = async () => {
    if (confirmPassword != password) return toast.error('A senha e a confirmação de senha são diferentes.')

    try {
      await signUpUser()
      toast.success('Conta criada com sucesso.')
      router.push('/')
    } catch (error) {
      error.response.data.errors.full_messages.forEach(message => toast.error(message))
    }
  }

  const signUpUser = async () => {
    appendDataToForm()
    let user: IUser = await getUser()
    dispatch(setLoggedUser(user))
  }

  const appendDataToForm = () => {
    formData.append('nickname', nickname)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('password_confirmation', confirmPassword)
    formData.append('image', image)
  }

  const getUser = async (): Promise<IUser> => {
    let user: IUser = await AuthService.signUp(formData)
    return user
  }

  const handleSetImage = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (areFilesEmpty(evt)) return

    const file = evt.target.files[0];
    setImage(file);
    setImageToShow(URL.createObjectURL(file))
  }

  const areFilesEmpty = (evt: React.ChangeEvent<HTMLInputElement>): boolean => {
    return evt.target.files.length == 0
  }

  return (
    <MainDiv>
      <Center lg={{ span: 8, offset: 2 }}>
        <FormDiv>
          <Row>
            <h1>Cadastrar</h1>
          </Row>
          <ResponsiveRow className="w-100">
            <Col className="justify-content-center align-items-center d-flex p-2">
              <UserImage
                {...{ image, imageToShow, fileField }}
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <Form className="w-100 d-flex flex-column justify-content-around">
                <Form.Group className="mb-3 justify-content-center d-flex" controlId="formBasicNickname">
                  <StyledInput
                    required
                    type="text"
                    placeholder="Nickname"
                    width='80%'
                    borderColor={Theme.appColors.loggedOff}
                    color={Theme.appColors.loggedOff}
                    shadow={Theme.appShadows.loggedOff}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 justify-content-center d-flex" controlId="formBasicEmail">
                  <StyledInput
                    required
                    type="email"
                    placeholder="Email"
                    width='80%'
                    borderColor={Theme.appColors.loggedOff}
                    color={Theme.appColors.loggedOff}
                    shadow={Theme.appShadows.loggedOff}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 justify-content-center d-flex" controlId="formBasicPassword">
                  <StyledInput
                    required
                    type="password"
                    placeholder="Senha"
                    width='80%'
                    borderColor={Theme.appColors.loggedOff}
                    color={Theme.appColors.loggedOff}
                    shadow={Theme.appShadows.loggedOff}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 justify-content-center d-flex" controlId="formBasicConfirmPassword">
                  <StyledInput
                    required
                    type="password"
                    placeholder="Confirmar senha"
                    width='80%'
                    borderColor={Theme.appColors.loggedOff}
                    color={Theme.appColors.loggedOff}
                    shadow={Theme.appShadows.loggedOff}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group hidden controlId="formBasicFile">
                  <StyledInput
                    type="file"
                    ref={fileField}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
                    width='80%'
                  />
                </Form.Group>

              </Form>
            </Col>
          </ResponsiveRow>
          <Row className="w-100 d-flex justify-content-center">
            <StyledButton
              onClick={() => handleSubmit()}
              outlined
              text='Cadastrar'
              hoverTextColor={Theme.appColors.white}
              backgroundColor={Theme.appColors.loggedOff}
              color={Theme.appColors.loggedOff}
              width='55%'
            />
          </Row>
        </FormDiv>
      </Center>
    </MainDiv>
  )
}
