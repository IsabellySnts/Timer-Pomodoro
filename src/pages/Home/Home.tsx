import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput type="text" list="task-suggestions" id="task" placeholder="Dê um nome para o seu projeto" />

                    <datalist id="task-suggestions">
                        <option value="Projeto Feed Ignite"/>
                    </datalist>

                    <label htmlFor="">Durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutes"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60} />
                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>

                    <Separator>:</Separator>

                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartCountdownButton type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>


        </HomeContainer>
    )
}