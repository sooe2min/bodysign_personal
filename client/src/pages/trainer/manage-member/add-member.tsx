import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Loading from '../../../components/Loading'
import {
	useCreateNonRegisteredUserMutation,
	useTrainerLazyQuery
} from '../../../generated/graphql'
import { userDataVar } from '../../../graphql/vars'

interface FormInput {
	name: string
	phone: string
	gender: string
	userCategoryId: number
	graduate: boolean
}

const labelProperties =
	'after:absolute after:border after:h-[4.8rem] after:bg-[#FDAD00] after:p-[1.2rem] after:w-full after:-top-0 after:z-[-1] after:transition-[left] after:duration-500 after:rounded-[2rem] peer-checked:cursor-default peer-checked:text-black peer-checked:after:left-0'

const AddMember: NextPage = () => {
	const router = useRouter()
	const userData = useReactiveVar(userDataVar)
	const [trainerLazyQuery, { loading, data }] = useTrainerLazyQuery()
	const [createNonRegisteredUser] = useCreateNonRegisteredUserMutation()
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = async data => {
		const input = {
			userName: data.name,
			phoneNumber: data.phone,
			gender: data.gender,
			userCategoryId: +data.userCategoryId,
			graduate: +data.graduate === 0 ? false : true
		}
		try {
			await createNonRegisteredUser({
				variables: {
					createNonRegisteredUserInput: {
						trainerId: userData?.id as number,
						userName: input.userName,
						phoneNumber: input.phoneNumber,
						gender: input.gender,
						userCategoryId: input.userCategoryId,
						graduate: input.graduate
					}
				}
			})
			router.push('/trainer/manage-member')
		} catch (error) {
			alert('다시 시도해 주세요.')
		}
	}

	useEffect(() => {
		if (userData) {
			trainerLazyQuery({
				variables: { id: userData?.id as number }
			})
		}
	}, [userData])

	if (loading) return <Loading />
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="flex text-[3.2rem]">
					<Link href="/trainer/manage-member" passHref>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="self-center w-[2.8rem] h-[2.8rem] cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
					</Link>
					<div className="ml-[0.8rem] font-bold">회원정보등록</div>
				</span>
			</div>

			<form
				className="mt-[1.6rem] text-[1.8rem]"
				onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label>이름</label>
					<input
						className="w-full p-[1.2rem] mt-[0.4rem] border shadow-md h-[4.8rem] rounded-[2rem]"
						type="text"
						{...register('name', {
							required: true
						})}
					/>
				</div>

				<div className="mt-[1.6rem]">
					<label>휴대폰 번호</label>
					<input
						className="w-full p-[1.2rem] mt-[0.4rem] border shadow-md h-[4.8rem] rounded-[2rem]"
						type="text"
						{...register('phone', {
							required: true,
							minLength: 10,
							maxLength: 11,
							pattern: {
								value: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
								message: '붙임표(-)는 제외하고 입력해주세요.'
							}
						})}
					/>
					{errors.phone?.type === 'pattern' && (
						<div className="text-[16px] text-red-500 mt-[0.4rem] text-center">
							{errors.phone.message}
						</div>
					)}
					{errors.phone?.type === 'minLength' && (
						<div className="text-[16px] text-red-500 mt-[0.4rem] text-center">
							휴대폰 번호가 너무 짧아요.
						</div>
					)}
					{errors.phone?.type === 'maxLength' && (
						<div className="text-[16px] text-red-500 mt-[0.4rem] text-center">
							휴대폰 번호가 너무 길어요.
						</div>
					)}
				</div>

				<div className="mt-[1.6rem]">
					<label>회원 카테고리</label>
					{loading ? (
						<Loading />
					) : (
						<select
							className="w-full p-[1.2rem] mt-[0.4rem] border shadow-md h-[4.8rem] rounded-[2rem] bg-white"
							{...register('userCategoryId')}>
							{data &&
								data.trainer.userCategories &&
								data.trainer.userCategories.map(category => {
									if (category) {
										return (
											<option
												key={category.id}
												value={category.id as number}>
												{category.name}
											</option>
										)
									}
								})}
						</select>
					)}
				</div>

				<div className="mt-[1.6rem]">
					<span>
						<input
							className="hidden peer"
							type="radio"
							id="male"
							value="male"
							defaultChecked
							{...register('gender', {
								required: true
							})}
						/>
						<label
							className={`${labelProperties} h-[4.8rem] rounded-l-[2rem] w-1/2 text-center p-[1.2rem] inline-block relative border border-r-0 cursor-pointer after:left-full after:border-r-0`}
							htmlFor="male">
							남성
						</label>
					</span>
					<span>
						<input
							className="hidden peer"
							type="radio"
							id="female"
							value="female"
							{...register('gender', {
								required: true
							})}
						/>
						<label
							className={`${labelProperties} h-[4.8rem] rounded-r-[2rem] w-1/2 text-center p-[1.2rem] inline-block relative border border-l-0 cursor-pointer after:-left-full after:border-l-0`}
							htmlFor="female">
							여성
						</label>
					</span>
				</div>

				<div className="mt-[1.6rem]">
					<span>
						<input
							className="hidden peer"
							type="radio"
							id="management"
							value="0"
							defaultChecked
							{...register('graduate', {
								required: true
							})}
						/>
						<label
							className={`${labelProperties} h-[4.8rem] rounded-l-[2rem] w-1/2 text-center p-[1.2rem] inline-block relative border border-r-0 cursor-pointer after:left-full`}
							htmlFor="management">
							관리중
						</label>
					</span>
					<span>
						<input
							className="hidden peer"
							type="radio"
							id="graduate"
							value="1"
							{...register('graduate', {
								required: true
							})}
						/>
						<label
							className={`${labelProperties} h-[4.8rem] rounded-r-[2rem] w-1/2 text-center p-[1.2rem] inline-block relative border border-l-0 cursor-pointer after:-left-full`}
							htmlFor="graduate">
							졸업
						</label>
					</span>
				</div>

				<input
					className={`w-full h-[4.8rem] mt-[1.6rem] text-black bg-[#FDAD00] cursor-pointer disabled:opacity-50 rounded-[2rem]`}
					value="회원등록"
					type="submit"
				/>
			</form>
		</>
	)
}

export default AddMember
