import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
  });

  describe('create', () => {
    it('should return an user after its creation', async () => {
      // Setup - cria o ambiente do teste
      const userDto = new CreateUserDto();
      userDto.idade = 12;
      userDto.nome = "Binha";

      // Execution - executa o teste
      // userCreated é o resultado do teste
      const userCreated = usersService.create(userDto);

      // Assertion - valida o teste e mostra o resultado
      expect(userCreated.id).toBe(1);
      expect(userCreated.idade).toBe(12);
      expect(userCreated.nome).toBe("Binha");
    });

    it('should return each user after two creations', async () => {
      // Setup - cria o ambiente do teste
      const userDto1 = new CreateUserDto();
      userDto1.idade = 28;
      userDto1.nome = "Binha";

      const userDto2 = new CreateUserDto();
      userDto2.idade = 26;
      userDto2.nome = "Biela";

      // Execution - executa o teste
      // userCreated é o resultado do teste
      const userCreated1 = usersService.create(userDto1);
      const userCreated2 = usersService.create(userDto2);

      // Assertion - valida o teste e mostra o resultado
      expect(userCreated1.id).toBe(1);
      expect(userCreated1.idade).toBe(28);
      expect(userCreated1.nome).toBe("Binha");

      expect(userCreated2.id).toBe(2);
      expect(userCreated2.idade).toBe(26);
      expect(userCreated2.nome).toBe("Biela");
    });
  });

  describe('findAll', () => {
    it('should return all users created', async () => {
      // Setup - cria o ambiente do teste

      const userDto1 = new CreateUserDto();
      userDto1.idade = 50;
      userDto1.nome = "Vander";

      const userDto2 = new CreateUserDto();
      userDto2.idade = 70;
      userDto2.nome = "Nildo";

      // Execution - executa o teste
      // userCreated é o resultado do teste
      usersService.create(userDto1)
      usersService.create(userDto2)
      const returnedUsers = usersService.findAll();

      // cada objeto fica em um slot separado da memoria
      // Assertion - valida o teste e mostra o resultado
      expect(returnedUsers[0]).toEqual({
        id: 1,
        ...userDto1,
      });
      expect(returnedUsers[1]).toEqual({
        id: 2,
        ...userDto2,
      });
      expect(returnedUsers.length).toBe(2);
    });
  });
  describe('findOne', () => {
    it('should find a existing user', async () => {
      // Setup - cria o ambiente do teste
      const userDto = new CreateUserDto();
      userDto.idade = 18;
      userDto.nome = "Luffy";

      // Execution - executa o teste
      // userCreated é o resultado do teste
      usersService.create(userDto)

      const returnedOneUser = usersService.findOne(1);

      // cada objeto fica em um slot separado da memoria
      // Assertion - valida o teste e mostra o resultado

      expect(returnedOneUser).toEqual({
        id: 1,
        nome: "Luffy",
        idade: 18,
      })
    });

  });
  describe('update', () => {
    it('should update a user', async () => {
      // Setup - cria o ambiente do teste
      const userDto = new CreateUserDto();
      userDto.idade = 50;
      userDto.nome = "Vander";
      const updateUserDto = new UpdateUserDto();
      updateUserDto.nome = "Vanderson";
      // Execution - executa o teste
      // userCreated é o resultado do teste
      usersService.create(userDto);
      usersService.findOne(1);
      const updatedUser = usersService.update(1, updateUserDto);

      // cada objeto fica em um slot separado da memoria
      // Assertion - valida o teste e mostra o resultado

      expect(updatedUser).toEqual({
        id: 1,
        nome: "Vanderson",
        idade: 50
      });
    });
  });
  describe('delete', () => {
    it('should delete a user', async () => {
      // Setup - cria o ambiente do teste
      const userDto = new CreateUserDto();
      userDto.idade = 20;
      userDto.nome = "Moria";

      // Execution - executa o teste
      // userCreated é o resultado do teste
      usersService.create(userDto);
      const beforDeleteUser = usersService.findOne(1);

      usersService.remove(1);
      const deleteUser = usersService.findOne(1);


      // cada objeto fica em um slot separado da memoria
      // Assertion - valida o teste e mostra o resultado

      expect(beforDeleteUser).not.toBeUndefined();
      expect(deleteUser).toBeUndefined();

    })
  })

});