import Header from "../components/Header"
import Button from "../components/Button.jsx"
import Cards from "../components/Cards.jsx"
import CardsWide from "../components/CardsWide"
import DownArrow from "../components/DownArrow"
import Painel from "../components/Painel.jsx"
import LogoCards from "../components/LogoCards.jsx"
import { AiOutlineCheckCircle } from "react-icons/ai";
import Duvida from "../components/Duvida.jsx"
import HyperLink from "../components/HyperLink.jsx"
import { FaInstagram } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";

function LandingPage(){
    return(
        <>
            <div class="w-[100%] h-[80vh] bg-[url(./background.jpg)] bg-size-[100%] bg-center">
                <Header></Header>
                <div class="w-[100%] h-[65vh] flex justify-center items-center font-bold">
                    <div class="w-[85%] h-[60vh] font-san-seriff flex flex-col gap-[30px]">
                        <p class="inline text-[#002E47] text-5xl ">
                            Soluções com acesso à <br />saúde <h1 class="inline text-[#AEC534]">sem carência e <br /> limite</h1> de idade
                        </p>
                        <h2 class="text-[#002E47] text-2xl">
                            Realize consultas online com médicos 24 horas por <br /> dia e tenha descontos em consultas e exames
                        </h2>
                        <div class="text-[#002E47] w-[150px] flex flex-col ">
                            <p>A partir de</p>
                            <h1 class="font-bold text-4xl">R$49,90</h1>
                            <p class="self-end">mensais*</p>
                        </div>
                        <Button text="Contratar Agora" bg="green"></Button>
                    </div>
                </div>
            </div>
            <div class="h-[17vh] w-[100%] bg-[#AEC534] flex justify-between items-center">
                <div class="w-[35%] h-[20vh] flex justify-center items-center gap-[15px]">
                    <img src="./iconLupa.svg" alt="" class="w-[60px]"/>
                    <h1 class="text-2xl font-bold text-[#002E47]">Encontre a sua<br /> especialidade <br />desejada</h1>
                </div>
                <div class="w-[55%] h-[20vh] flex justify-center items-center">
                    <button class="bg-[#002E47] w-[320px] h-[70px] text-[#AEC534] rounded-[50px] text-3xl font-thin">Buscar Rede</button>
                </div>
            </div>
            <div class="w-[100%] h-[60vh] bg-[#002E47] flex flex-col items-center justify-evenly">
                <h1 class="text-[#ffff] text-3xl font-bold inline text-center">Soluções em saúde para <br /> cuidar de <h1 class="text-[#AEC534] inline">você</h1> da sua <h1 class="text-[#AEC534] inline">família</h1> </h1>
                <div class="flex justify-evenly w-[85%]">
                    <Cards textColor="white"  color="green" text={<>Telemedicina com médicos online 24hrs <br /> por dia </>} img="./ativo 1.png"></Cards>
                    <Cards textColor="white"  color="green" text={<>Descontos em consultas, exames e muito <br />mais</>} img="./ativo 2.png"></Cards>
                    <Cards textColor="white"  color="green" text={<>Descontos em procedimentos estéticos e <br />Cirurgias</>} img="./ativo 3.png"></Cards>
                </div>
                <Button size="2" bg="green" text="Quero Contratar Agora"></Button>
            </div>
            <div class="w-[100%] flex flex-col items-center ">
                <div class="w-[90%] h-[25vh] flex flex-col justify-center gap-[10px] ">
                    <h1 class="text-4xl font-bold text-[#002E47] inline">Com a <h1 class="inline text-[#AEC534]">Ostermed</h1> você tem...</h1>
                    <h2 class="text-[20px] font-light text-[#002E47]">Tudo  em saúde em um único lugar. Existe por você!</h2>
                </div>
                <DownArrow></DownArrow>
                <div class="w-[100%] h-[40vh] flex justify-center items-center gap-7">
                    <CardsWide text={<>Tudo que <br />precisa em <br />saúde em um <br />único lugar</>}></CardsWide>
                    <img src="./Ativo 6.png" class="h-[33vh]" alt="" />
                </div>
                <DownArrow></DownArrow>
                <div class="w-[100%] h-[40vh] flex justify-center items-center gap-7">
                    <CardsWide text={<>Centro de <br />imagem e <br />diagnósticos <br />precisos</>}></CardsWide>
                    <img src="./Ativo 7.png" class="h-[33vh]" alt="" />
                </div>
                <DownArrow></DownArrow>
                <div class="w-[100%] h-[40vh] flex justify-center items-center gap-7">
                    <CardsWide text={<>Tudo que você <br /> precisa em saúde <br /> em um único lugar. <br />Existimos por você!</>}></CardsWide>
                    <img src="./Ativo 8.png" class="h-[33vh]" alt="" />
                </div>
            </div>
            <div class="w-[100%] h-[80vh] bg-[#AEC534] flex flex-col justify-evenly items-center">
                <h1 class="text-center w-[100%] h-[5vh] text-[#002E47] text-4xl font-semibold inline">Acesso imediato a um time <br /> de <h1 class="text-[#ffff] font-semibold inline" >saúde digital </h1>sem sair de <h1 class="text-[#ffff] font-semibold  inline">casa</h1>!</h1>
                <div class="flex justify-center gap-7 w-[100%]">
                    <Cards textColor="blue"  color="blue" text="Dezenas de Especialistas a sua disposição" img="./ativo 1.png"></Cards>
                    <Cards textColor="blue"  color="blue" text="Dezenas de Especialistas a sua disposição" img="./ativo 2.png"></Cards>
                </div>
                <div class="flex justify-center gap-7 w-[100%]">
                    <Cards textColor="blue" color="blue" text="Dezenas de Especialistas a sua disposição" img="./ativo9.png"></Cards>
                    <Cards textColor="blue" color="blue" text="Dezenas de Especialistas a sua disposição" img="./ativo 3.png"></Cards>
                </div>
            </div>
            <img src="./ativo 10.jpeg" class="object-cover w-[100%] h-[45vh] " alt="" />
            <div class="w-[100%] h-[25vh] flex justify-center items-center bg-[#C7C9B8]">
                <h1 class="text-center text-[#ffff] text-4xl font-bold">A segurança em saúde <br />que a sua família procura</h1>
            </div>
            <div class="bg-[#002E47] w-[100%] h-[170vh] justify-center gap-5 flex flex-col items-center">
                <h1 class="text-[#ffff] text-4xl text-center font-light h-[10vh] mt-[50px]">Escolha o <h1 class="font-bold inline">plano</h1> que encaixa <br /> em sua necessidade</h1>
                <div class="flex w-[100%] justify-center gap-5">
                    <Painel type="blue" plano="Angel" preco="59,90" desconto="50" dependentes="4" telemed="Telemedicina com clínico geral"></Painel>
                    <Painel type="green" plano="Guardian" preco="89,90" desconto="60" dependentes="5"telemed="Telemedicina com clínico geral gratuita"></Painel>
                </div>  
                <div class="flex w-[100%] justify-center gap-5">
                    <Painel type="blue" plano="Premium" preco="99,90" desconto="70" dependentes="6" telemed="Telemedicina com clínico geral e 21 especilidades"></Painel>
                    <Painel type="gray" plano="Diamond" preco="159,90" desconto="70" dependentes="6" telemed="Telemedicina com clínico geral e 21 especialidades médicas" status="ativo"></Painel>
                </div>
            </div>
            <div class="w-[100%] h-[60vh] flex flex-col justify-center items-center bg-[#E1E1E1]">
                <h1 class="text-3xl text-[#002E47] text-center"> Medicamentos com descontos <br />nas melhores redes de farmácias</h1>
                <div class="w-[80%] flex justify-evenly m-[40px]">
                    <LogoCards img="./DROGA RAIA .png"></LogoCards>
                    <LogoCards img="./DROGARIA SAO PAULO.png"></LogoCards>
                    <LogoCards img="./DROGARIAS PACHECO FUNDO BRANDO.png"></LogoCards>
                    <LogoCards img="./DROGASIL (1).png"></LogoCards>
                </div>
                <div class="w-[80%] flex justify-evenly">
                    <LogoCards img="./GRUPO DPSP ORIGINAL  SEM FUNDO.png"></LogoCards>
                    <LogoCards img="./PAGUE MENOS (1).png"></LogoCards>
                    <LogoCards img="./PANVEL (1).png"></LogoCards>
                    <LogoCards img="./SAO JOAO.png"></LogoCards>
                </div>
            </div>
            <div class="w-[100%] h-[115vh] flex flex-col items-center justify-center text-[#ffff] bg-[#AEC534] text-3xl font-thin">
                <div class="w-[100%] h-[15vh] flex flex-col items-center justify-center gap-3">
                    <h1 class="text-4xl">Plano <h1 class="font-normal inline">Empresarial</h1> e <h1 class="font-normal inline">Corporativo</h1></h1>
                    <h2>Feito exclusivamente para colaboradores da sua empresa e que podem ser personalizados</h2>
                </div>
                <div class="w-[100%] h-[90vh] flex justify-center items-center gap-7">
                    <div class="w-[44%] h-[90vh] flex flex-col border-2 border-solid bg-[#AEC534] rounded-3xl items-center">
                        <div class="h-[30vh] w-[90%] flex flex-col justify-center items-center gap-2">
                            <h1 class="text-4xl font-bold text-[#ffff] m-[20px]">STANDARD EMPRESARIAL</h1>
                            <div class="w-[40%] h-[4vh] bg-[#002E47] flex justify-center items-center rounded-[2.5vh] text-[22px] font-thin text-[#ffff]">
                                <h1>A partir de</h1>
                            </div>
                            <h1 class="text-4xl font-bold text-[#ffff] m-[10px]">R$23,90</h1>
                            <h2 class="text-[20px] font-thin text-[#ffff]">Mensais e individual</h2>
                            <h3 class="text-[12px] font-thin text-[#ffff] ">Pagando a sua <h3 class="font-bold inline">assinatura anual</h3>,  ganhe desconto e comece a usar imediatamente</h3>
                        </div>
                        <div class={`w-[90%] h-[50vh] flex flex-col justify-evenly text-[17px] text-[#ffff] font-thin`}>
                            <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#002E47]" /> Sem carência</p>
                            <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#002E47]" /> Rede credenciada regional</p>
                            <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#002E47]" /> Descontos em hospitais, clínicas, laboratórios e farmácias</p>
                            <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#002E47]" /> Telemedicina 4 especialidades</p>
                            <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#002E47]" /> Consultas médicas com clínico geral</p>
                            <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#002E47]" /> Pedidos de exames</p>
                            <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#002E47]" /> Receitas de remédios controlado</p>
                            <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#002E47]" /> Atestado médico</p>                                <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#002E47]" /> Sem limite de utilização</p>
                        </div>
                        <div class="w-[100%] h-[10vh] flex justify-center items-center">
                            <button class="w-[30%] h-[5vh] rounded-4xl border-[#ffff] border-1 text-center text-[20px] font ">contrate agora</button>
                        </div>
                    </div>
                    <div class="w-[44%] h-[90vh] flex flex-col bg-[#002E47] rounded-3xl items-center">
                        <div class="h-[30vh] w-[90%] flex flex-col justify-center items-center gap-2">
                            <h1 class="text-4xl font-bold text-[#ffff] m-[20px]">PREMIUM PESSOA JURÍDICA</h1>
                            <div class="w-[40%] h-[4vh] flex justify-center items-center rounded-[2.5vh] text-[22px] font-thin text-[#ffff] border-1 border-[#ffff]">
                                <h1>A partir de</h1>
                            </div>
                            <h1 class="text-4xl font-bold text-[#ffff] m-[10px]">R$45,90</h1>
                            <h2 class="text-[20px] font-thin text-[#ffff]">Mensais e individual</h2>
                            <h3 class="text-[12px] font-thin text-[#ffff] ">Pagando a sua <h3 class="font-bold inline">assinatura anual</h3>,  ganhe desconto e comece a usar imediatamente</h3>
                        </div>
                        <div class={`w-[90%] h-[50vh] flex flex-col justify-evenly text-[17px] text-[#ffff] font-thin`}>
                                <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#ffff]" /> Rede estadual</p>
                                <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#ffff]" /> Sem carência</p>
                                <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#ffff]" /> Rede credenciada regional</p>
                                <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#ffff]" /> Descontos em hospitais, clínicas, laboratórios e farmácias</p>
                                <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#ffff]" /> Telemedicina 21 especialidades</p>
                                <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#ffff]" /> Consultas médicas com clínico geral</p>
                                <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#ffff]" /> Pedidos de exames</p>
                                <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#ffff]" /> Receitas de remédios controlado</p>
                                <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#ffff]" /> Atestado médico</p>
                                <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#ffff]" /> Sem limite de utilização</p>
                                <p class="flex gap-2"><AiOutlineCheckCircle class="text-[#ffff]" /> Auxílio funeral</p>
                        </div>
                        <div class="w-[100%] h-[10vh] flex justify-center items-center">
                            <button class="w-[30%] h-[5vh] rounded-4xl border-[#ffff] border-1 text-center text-[20px] font ">contrate agora</button>
                        </div>
                    </div>   
                </div>
            </div>
            <div class="w-[100%] bg-[#002E47] flex flex-col items-center ">
                <div class="w-[100%] h-[20vh] flex justify-center items-center  ">
                    <h1 class="text-3xl text-[#ffff]">Vamos tirar as suas <h1 class="font-bold inline">dúvidas?</h1></h1>
                </div>
                <div class="w-[100%] flex flex-col items-center justify-evenly gap-2.5 pb-[70px]">
                    <Duvida question="A Ostermed é um plano de saúde?" answer="A gente não é plano de saúde, mas oferecemos aos nossos usuários um universo de possibilidades em saúde - através de uma plataforma multicanal como uma rede credenciada completa com grandes centros hospitalares, redes de laboratórios para exames simples e complexos, centros de imagem super modernos e farmácias espalhadas por todo país. Ah!! A gente cuida da sua saúde e de quem você ama em qualquer lugar e a qualquer hora através da telemedicina. "></Duvida>
                    <Duvida question="Como posso contratar a Ostermed?" answer={<>Bem simples! Você pode contratar um dos nossos planos através de 3 <br />canais: <br /> <br />- Nosso site : www.ostermed.com.br <br />- Através do Instagram no link da Bio <br />- Através do nosso whatsapp, onde nosso time vai lhe dar todo suporte</>}></Duvida>
                    <Duvida question="Tem carência para utilizar a Ostermed?" answer="Nada de carência! No momento em que você baixa e acessa nosso app, a carteira digital já estará disponível para uso em qualquer estabelecimento da nossa rede e para consultas com nosso time de saúde digital (Telemedicina)."></Duvida>
                    <Duvida question="Precisa ter parentesco ( Pais, filhos, avós) para incluir nos planos de  Ostermed?" answer="Na Ostermed entendemos que os laços de amor vão além da consanguinidade. Dessa forma, você pode incluir quem você quiser no planos. O importante é todos estarem felizes e cuidarem da saúde de forma leve e equilibrada."></Duvida>
                    <Duvida question="Qual a abrangência da rede credenciada física?" answer="A Ostermed possui parceria com grandes redes hospitalares, centros médicos, centros de imagem, laboratórios e em breve redes de academias em todo estado de Santa Catarina. Nossa rede está em expansão para RJ e SP. Tudo feito para acolher você onde estiver e qualquer hora."></Duvida>
                    <Duvida question="Os planos possuem reajustes anuais?" answer="Sim, pois entendemos que a cada ano queremos tornar a experiência do usuário mais completa e leve conosco. Por isso, vamos agregando novas soluções e serviços para dar mais comodidade e agilidade em cada caso."></Duvida>
                    <Duvida question="Quando recebo minha carteirinha?" answer="Assim que você contratar o plano , a carteirinha da Ostermed estará prontinha no app. Qualquer dificuldade, não hesite em nos contatar, ok?"></Duvida>
                    <Duvida question="Como funcionam as consultas por telemedicina?" answer="É super simples!! Primeiro ponto importante é que não há carência. Contratou a Ostermed, você já pode realizar a consulta com nosso time de especialistas em qualquer lugar e a qualquer hora. Segundo, na Ostermed você tem uma time de especialistas de diferentes especialidades que podem lhe atender sem sair de casa. Você pode acessar o profissional através do App, basta alguns cliques e pronto"></Duvida>
                    <Duvida question="Se eu tiver dificuldade em agendar consultas e exames na rede, a quem devo recorrer?" answer="Entre em contato com nosso suporte. Temos um time preparado para te ajudar no direcionamento e agendamento se necessário de exames e consultas. "></Duvida>
                    <Duvida question="É verdade que a Ostermed possui linhas de cuidados para autismo?" answer="Essa é uma das nossas batalhas! Prover o melhor acesso para crianças que está em fase de diagnóstico e acompanhamento para transtorno do espectro autista. Basta entrar em contato conosco pelo suporte ou acessar nossa rede credenciada pelo App e você vai encontrar centros especializados."></Duvida>
                    <Duvida question="Os planos da Ostermed possuem coberturas para cirurgias ou internações?" answer="Não temos cobertura para cirurgias ou internações, mas na rede credenciada o usuário poderá realizar cirurgias em alguns hospitais da rede com descontos significativos. Internações hospitalares e em leito de UTI também possuem descontos especiais. Consulte nosso suporte quando precisar de cirurgia e ajudaremos você da melhor forma."></Duvida>
                    <Duvida question="Qual o período de permanência nos planos da Ostermed?" answer="Se depender da gente, queremos você e aqueles que ama sempre conosco. Nossos contratos prevêem um tempo de 12 meses podendo serem renovados automaticamente. "></Duvida>
                    <Duvida question="O que eu posso esperar ao entrar na comunidade da Ostermed?" answer="Ao entrar na Ostermed desejamos que você seja acolhido em suas necessidades e que possamos te ajudar a levar uma vida leve e virtuosa, através da nossa esteira de serviços. Seja feliz, seja leve, seja Ostermed."></Duvida>
                </div>
            </div>
            <div class="w-[100%] h-[80vh] bg-[url(./background2.png)] bg-cover flex justify-center items-center">
                <div class="w-[30%] h-[65vh] flex flex-col justify-evenly items-center">
                    <h1 class="text-5xl font-semibold text-[#002E47]">Contato</h1>
                    <h2 class=" font-thin">Preencha as informações abaixo</h2>
                    <div class="w-[100%] h-[50vh] flex flex-col justify-evenly" >
                        <div class="w-[100%]">
                            <span class="font-thin">Nome</span>
                            <input class="p-[15px] w-[100%] h-[5vh] bg-[#ffff] border-1 rounded-[3px] border-[#e0e0e0] outline-0 focus:border-[#AEC534] hover:border-[#AEC534] placeholder:text-[#e0e0e0] font-thin" type="text" placeholder="Jorge Lima"/>
                        </div>
                        <div class="w-[100%]">
                            <span class="font-thin">Email</span>
                            <input class="p-[15px] w-[100%] h-[5vh] bg-[#ffff] border-1 rounded-[3px] border-[#e0e0e0] outline-0 focus:border-[#AEC534] hover:border-[#AEC534] placeholder:text-[#e0e0e0] font-thin" type="text" placeholder="jrlima@gmail.com" />
                        </div>
                        <div class="w-[100%]">
                            <span class="font-thin">Assunto</span>
                            <input class="p-[15px] w-[100%] h-[5vh] bg-[#ffff] border-1 rounded-[3px] border-[#e0e0e0] outline-0 focus:border-[#AEC534] hover:border-[#AEC534] placeholder:text-[#e0e0e0] font-thin" type="text" placeholder="Nome do assunto" />
                        </div>
                        <div class="w-[100%]">
                            <span class="font-thin">Descrição</span>
                            <textarea name="" id="" class="p-[15px] w-[100%] h-[250px] bg-[#ffff] border-1 rounded-[3px] align-top border-[#e0e0e0] outline-0 focus:border-[#AEC534] hover:border-[#AEC534] placeholder:text-[#e0e0e0] font-thin resize-none" placeholder="Descreva a sua informação"></textarea>
                        </div>
                    </div>
                    <div class="w-[100%] h-[15vh] flex justify-center items-center">
                        <Button bg="blue" text="Enviar mensagem"></Button>
                    </div>  
                </div>
            </div>
            <div class="w-[100%] h-[40vh] bg-[#ffff] flex justify-around">
                <div class="w-[35%] px-[90px] py-[70px] text-3xl flex flex-col justify-between">
                    <div class=" flex gap-[15px]">
                        <ImFacebook2 />
                        <FaInstagram />
                    </div>
                    <img src="./logoOstermed.png" alt="" class="w-[50%]" />
                </div>
                <div class="w-[30%] h-[40vh]">
                    <h1 class="text-[#002E47] text-xl font-bold flex-col flex h-[10vh] justify-center">Área do Cliente</h1>
                    <div class="flex flex-col h-[25vh] justify-evenly">
                        <HyperLink text="Login"></HyperLink>
                        <HyperLink text="Credenciados"></HyperLink>
                        <HyperLink text="Licenciados"></HyperLink>
                        <HyperLink text="Parceiros"></HyperLink>
                        <HyperLink text="Política de privacidade"></HyperLink>
                    </div>
                </div>
                <div class="w-[35%]">
                    <h1 class="text-[#002E47] text-xl font-bold flex-col flex h-[10vh] justify-center">Navegação</h1>
                    <div class="flex flex-col h-[25vh] justify-evenly">
                        <HyperLink text="Planos"></HyperLink>
                        <HyperLink text="Sobre a Ostermed"></HyperLink>
                        <HyperLink text="Benefícios"></HyperLink>
                        <HyperLink text="Dúvidas"></HyperLink>
                        <HyperLink text="Depoimentos"></HyperLink>
                        <HyperLink text="Blog"></HyperLink>  
                    </div>
                </div>
            </div>
            <div class="bg-[#eeeeee] h-[5vh] w-[100%] flex justify-center items-center">
                <h1 class="text-xs text-[#797979]">Todos os direitos reservados - © Ostermed 2024</h1>
            </div>
        </>
    )
}
export default LandingPage