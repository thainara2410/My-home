import Frame from '../../assets/icons/Frame.svg';
import { Container, Form  } from './personalizar'; 
import { FilledInput } from '@mui/material';
import { Button, InputAdornment } from '@mui/material';
import { HiOutlineUser } from 'react-icons/hi';
import { SlLock } from 'react-icons/sl';
function AreaDeLogin() {
    return (
        <Container>
            <div className="areaDeLogin">
                <div className='areaDeLogin__esquerda'>
                    <img src={Frame} alt="Logo" />
                    <h1>Acesse sua conta</h1>
                    <h2>E tenha acesso aos nossos serviços</h2>
                </div>
                <div className='areaDeLogin__direita'>
                   
                    <Form>
                    <h1>Bem-vindo ao My Home!</h1>
                     
                            <h2>Login</h2>
                       
                            <FilledInput
                                id="filled-adornment-weight"
                                className="input"
                                placeholder="E-mail"
                                endAdornment={<InputAdornment position="end">
                                    <HiOutlineUser
                                        style={{ 
                                            color:'#0563e7ba',
                                            fontSize: '1.4rem',
                                            
                                            }}
                                    />
                                </InputAdornment>

                                }
                            />
                            <FilledInput
                                id="filled-adornment-weight"
                                className="password"
                                type="password"
                                placeholder="Senha"
                                endAdornment={<InputAdornment position="end">
                                    <SlLock
                                        style={{ 
                                            color:'#0563e7ba',
                                            fontSize: '1.4rem',
                                            
                                            }}
                                    />
                                </InputAdornment>

                                }
                            />
                        
                        <div className='bottom'>
                            <Button variant="contained" className="checkbox">
                                Entrar
                            </Button>
                            
                        </div>
                        <div className='esqueceuSenha'>
                            <p><a href='/'>Esqueci a Senha</a></p>
                        </div>
                       
                    </Form>
                </div>
            </div>
        </Container>
    )
}

export default AreaDeLogin;
