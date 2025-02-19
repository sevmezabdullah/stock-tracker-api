const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../../utils/token');
const { getUserByEmail, createUser, getAllUsers, getUserCount } = require('./userRepository');
const { sendVerificationEmail } = require('../../utils/email');
const { loginService, registerUserService, getAllUsersService, getUserCountService } = require('./userService');

// Mock'ları oluşturuyoruz
jest.mock('bcrypt');
jest.mock('../../utils/token');
jest.mock('./userRepository');
jest.mock('../../utils/email');

describe('User Service Tests', () => {
    beforeEach(() => {
        // Her test öncesi mock'ları temizliyoruz
        jest.clearAllMocks();
    });

    describe('loginService', () => {
        test('başarılı giriş durumunda token dönmeli', async () => {
            // Mock verileri
            const mockUser = {
                email: 'test@test.com',
                password: 'hashedPassword',
                name: 'Test User'
            };
            const mockToken = 'mock-token';

            // Mock fonksiyonların davranışlarını ayarlıyoruz
            getUserByEmail.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            generateAccessToken.mockResolvedValue(mockToken);

            const result = await loginService('test@test.com', 'password123');

            expect(result).toBe(mockToken);
            expect(getUserByEmail).toHaveBeenCalledWith('test@test.com');
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
        });

        test('kullanıcı bulunamadığında null dönmeli', async () => {
            getUserByEmail.mockResolvedValue(null);

            const result = await loginService('nonexistent@test.com', 'password123');

            expect(result).toBeNull();
            expect(getUserByEmail).toHaveBeenCalledWith('nonexistent@test.com');
        });
    });

    describe('registerUserService', () => {
        test('kullanıcı başarıyla kaydedilmeli', async () => {
            const mockUser = {
                name: 'Test User',
                email: 'test@test.com',
                password: 'hashedPassword'
            };

            bcrypt.hash.mockResolvedValue('hashedPassword');
            createUser.mockResolvedValue(mockUser);

            const result = await registerUserService('Test User', 'test@test.com', 'password123');

            expect(result).toEqual(mockUser);
            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(createUser).toHaveBeenCalledWith('Test User', 'test@test.com', 'hashedPassword');
            expect(sendVerificationEmail).toHaveBeenCalledWith('test@test.com', 'Hoşgeldiniz', 'Test User', '1234567');
        });
    });

    describe('getAllUsersService', () => {
        test('tüm kullanıcıları getirmeli', async () => {
            const mockUsers = [
                { name: 'User 1', email: 'user1@test.com' },
                { name: 'User 2', email: 'user2@test.com' }
            ];

            getAllUsers.mockResolvedValue(mockUsers);

            const result = await getAllUsersService();

            expect(result).toEqual(mockUsers);
            expect(getAllUsers).toHaveBeenCalled();
        });
    });

    describe('getUserCountService', () => {
        test('kullanıcı sayısını getirmeli', async () => {
            const mockCount = 5;

            getUserCount.mockResolvedValue(mockCount);

            const result = await getUserCountService();

            expect(result).toBe(mockCount);
            expect(getUserCount).toHaveBeenCalled();
        });
    });
}); 