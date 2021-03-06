import React from 'react'
import { Row, Container, Col } from 'react-bootstrap'
import { IAnimePost } from '../../../../../../../dtos/Posts'
import { ContentContainer, UserCol, UserImage, UserNickname, TimeCol } from './styles'
import moment from 'moment/min/moment-with-locales'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { DeleteIcon } from './DeleteIcon'
import { EditIcon } from './EditIcon'
import AnimePostService from '../../../../../../../services/posts/AnimePosts'
import { toast } from 'react-toastify'
import { StyledButton } from '../../../../../../Shared/StyledButton'
import { Theme } from '../../../../../../../styles/theme'
import { LikeIcon } from './LikeIcon'



interface IProps {
  comment: IAnimePost,
  owner: boolean,
  updateComments: () => Promise<void>
}

export const CommentComponent: React.FC<IProps> = ({ comment, owner, updateComments }) => {

  moment.locale('pt-br')

  const [editable, setEditable] = React.useState<boolean>(false)

  const [content, setContent] = React.useState<string>(comment.content)

  const renderEditAndDelete = () => {
    if (owner) {
      let oneHourAfterPostCreated = moment(comment.created_at).utc().add(1, 'hours')
      let now = moment().utc()
      if (now.isSameOrAfter(oneHourAfterPostCreated)) {
        return (
          <DeleteIcon comment_id={comment.id} updateComments={updateComments} />
        )
      }
      return (
        <>
          <EditIcon setEditable={setEditable} />
          <DeleteIcon comment_id={comment.id} updateComments={updateComments} />
        </>
      )
    }
    return ''
  }

  const confirmEdit = async () => {
    setEditable(false)
    let success = await AnimePostService.editAnimePost(content, comment.id)
    if (success) {
      updateComments()
    } else {
      toast.error('Erro ao editar seu comentário, tente novamente mais tarde.')
    }
  }

  return (
    <>
      <hr />
      <Row>
        <UserCol lg={3}>
          <UserImage src={comment.user_image_url} width={60} height={60} />
          <UserNickname>{comment.user_nickname}</UserNickname>
        </UserCol>
        <TimeCol className='justify-content-end'>
          Postado {moment(comment.created_at).fromNow()} {renderEditAndDelete()}
        </TimeCol>
      </Row>
      <Row>
        <Container>
          <ContentContainer value={content} disabled={!editable} onChange={e => setContent(e.target.value)} />
        </Container>
      </Row>
      {editable && owner
        ?
        <Row className='justify-content-evenly'>
          <StyledButton
            text='Cancelar'
            onClick={() => {
              setContent(comment.content);
              setEditable(false)
            }}
            width='25%'
            outlined
            color={Theme.appColors.loggedOff}
          />
          <StyledButton
            text='Confirmar'
            onClick={() => confirmEdit()}
            width='25%'
            outlined
            color={Theme.appColors.loggedIn}
          />
        </Row>
        :
        null}
      <Row>
        <Col className='text-center mt-2'>
          <LikeIcon comment={comment} />
        </Col>
        <Col className='text-center mt-2'>
          <span><FontAwesomeIcon icon={faReply} onClick={() => alert('teste')} /> {comment.replies}</span>
        </Col>
      </Row>
    </>
  )
}
