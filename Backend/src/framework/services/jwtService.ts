import { DecodedTokenEntity, IjwtServiceInterface } from "../../domain/interface/serviceInterfaces/jwtServiceInterface";
import jwt from 'jsonwebtoken'
export class JwtService implements IjwtServiceInterface {
    createAccessToken(accessSecretKey: string, userId: string, role: string): string {
        return jwt.sign({ userId, role }, accessSecretKey, { expiresIn: '15m' })
    }
    createRefreshToken(refreshSecretKey: string, userId: string, role: string): string {
        return jwt.sign({ userId, role }, refreshSecretKey, { expiresIn: '1d' })
    }
    async verifyAccessToken(accessToken: string, accessSecretKey: string) {
        try {
            return jwt.verify(accessToken, accessSecretKey) as { userId: string, role: string }
        } catch (error) {
            return null
        }
    }
    verifyRefreshToken(refreshToken: string, refreshSecretKey: string): { userId: string, role: string } | null {
        try {
            return jwt.verify(refreshToken, refreshSecretKey) as { userId: string, role: string }
        } catch (error) {
            return null
        }
    }
    tokenDecode(accessToken: string): DecodedTokenEntity | null {
        return jwt.decode(accessToken) as DecodedTokenEntity
    }
}