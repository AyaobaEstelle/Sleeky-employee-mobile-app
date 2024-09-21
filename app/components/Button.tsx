import { Pressable, Text } from "react-native";

const Button = ({
  title,
  handlePress,
  isLoading,
}: {
  title: string;
  handlePress: () => void;
  isLoading: boolean;
}) => {
  return (
    <Pressable onPress={handlePress} disabled={isLoading}>
      <Text>{title}</Text>
    </Pressable>
  );
};

export default Button;
