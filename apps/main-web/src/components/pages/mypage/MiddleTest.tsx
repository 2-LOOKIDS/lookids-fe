const schemaMap = {
  signup: signupSchema,
  signin: signinSchema,
};
interface SignupFormProps<T extends keyof typeof schemaMap> {
  type: T;
  defaultValues: DefaultValues<z.infer<(typeof schemaMap)[T]>>;
  fields: { label: string; field: Path<z.TypeOf<(typeof schemaMap)[T]>> }[];
}

export function GenericForm<T extends keyof typeof schemaMap>({
  type,
  defaultValues,
  fields,
}: SignupFormProps<T>) {
  return (
    <InternalGenericForm
      schema={schemaMap[type]}
      defaultValues={defaultValues}
      fields={fields}
    />
  );
}

export default async function Signup() {
  return (
    <div className="flex h-full items-center justify-center">
      <GenericForm
        type={'signup'}
        defaultValues={{
          email: 'hi',
          age: 6,
        }}
        fields={[
          { label: '이메일', field: 'email' },
          { label: '나이', field: 'age' },
        ]}
      />
    </div>
  );
}
