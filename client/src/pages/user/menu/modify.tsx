import { gql, useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

export const UpdateUserDocument = gql`
	mutation UpdateUser($updateUserInput: UpdateUserInput!) {
		updateUser(updateUserInput: $updateUserInput) {
			id
			email
			userName
			birthDate
			phoneNumber
			gender
		}
	}
`

const Modify: NextPage = () => {
	const [updateUser] = useMutation(UpdateUserDocument)

	const [userInfo, setUserInfo] = useState({
		name: '홍길동',
		sex: '남',
		email: 'c.designer@kakao',
		birth: '2000.01.01',
		phone: '010-1234-5678'
	})

	const getNewName = (e: any) => {
		let name = e.target.value

		setUserInfo({
			...userInfo,
			name: name
		})
	}

	const getNewSex = (e: any) => {
		let sex = e.target.value

		setUserInfo({
			...userInfo,
			sex: sex
		})
	}

	const getNewEmail = (e: any) => {
		let email = e.target.value

		setUserInfo({
			...userInfo,
			email: email
		})
	}

	const getNewPhone = (e: any) => {
		let phone = e.target.value

		setUserInfo({
			...userInfo,
			phone: phone
		})
	}

	const getNewBirth = (e: any) => {
		let birth = e.target.value

		setUserInfo({
			...userInfo,
			birth: birth
		})
	}

	const saveInfo = () => {
		updateUser({
			variables: {
				updateUserInput: {
					email: userInfo.email,
					userName: userInfo.name,
					birthDate: userInfo.birth,
					phoneNumber: userInfo.phone,
					gender: userInfo.sex
				}
			}
		})
		alert('수정이 완료되었습니다.')
		window.location.href = '/user/menu/info'
	}

	return (
		<div className="font-IBM flex flex-col m-5 mx-4 my-5 text-[12px]">
			<div className="flex items-center mb-10">
				<Link href="/user/menu/info" passHref>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</Link>
				<div className="font-bold text-[20px]">정보 수정</div>
				<svg
					onClick={saveInfo}
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>
			<table>
				<tbody>
					<tr className="flex">
						<td className="flex-auto font-bold">이름</td>
						<td>
							<input
								className="font-thin text-right"
								value={userInfo.name}
								onChange={getNewName}
							/>
						</td>
					</tr>
					<tr className="flex">
						<td className="flex-auto font-bold">성별</td>
						<td>
							<input
								className="font-thin text-right"
								value={userInfo.sex}
								onChange={getNewSex}
							/>
						</td>
					</tr>
					<tr className="flex">
						<td className="flex-auto font-bold">이메일</td>
						<td>
							<input
								className="font-thin text-right"
								value={userInfo.email}
								onChange={getNewEmail}
							/>
						</td>
					</tr>
					<tr className="flex">
						<td className="flex-auto font-bold">생년월일</td>
						<td>
							<input
								className="font-thin text-right"
								value={userInfo.birth}
								onChange={getNewBirth}
							/>
						</td>
					</tr>
					<tr className="flex">
						<td className="flex-auto font-bold">전화번호</td>
						<td>
							<input
								className="font-thin text-right"
								value={userInfo.phone}
								onChange={getNewPhone}
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Modify
